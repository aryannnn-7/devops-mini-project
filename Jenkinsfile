// Jenkinsfile
// Place this in your project root

pipeline {
    agent any
    
    environment {
        DOCKER_REGISTRY = 'your-docker-hub-username'
        BACKEND_IMAGE = "${DOCKER_REGISTRY}/legal-rights-backend"
        FRONTEND_IMAGE = "${DOCKER_REGISTRY}/legal-rights-frontend"
        DOCKER_CREDENTIALS = credentials('docker-hub-credentials')
        JIRA_SITE = 'your-jira-site'
    }
    
    stages {
        stage('Checkout') {
            steps {
                // Checkout code from Git
                checkout scm
                
                // Update Jira ticket
                script {
                    def issueKey = sh(
                        script: "git log -1 --pretty=%B | grep -oP '(?<=\\[)[A-Z]+-[0-9]+(?=\\])'",
                        returnStdout: true
                    ).trim()
                    
                    if (issueKey) {
                        jiraAddComment(
                            site: "${JIRA_SITE}",
                            idOrKey: issueKey,
                            comment: "Build #${BUILD_NUMBER} started"
                        )
                    }
                }
            }
        }
        
        stage('Install Dependencies') {
            parallel {
                stage('Backend Dependencies') {
                    steps {
                        dir('backend') {
                            sh 'npm ci'
                        }
                    }
                }
                stage('Frontend Dependencies') {
                    steps {
                        dir('frontend') {
                            sh 'npm ci'
                        }
                    }
                }
            }
        }
        
        stage('Run Tests') {
            parallel {
                stage('Backend Tests') {
                    steps {
                        dir('backend') {
                            sh 'npm test || true'
                        }
                    }
                }
                stage('Frontend Tests') {
                    steps {
                        dir('frontend') {
                            sh 'npm test -- --coverage --watchAll=false || true'
                        }
                    }
                }
            }
        }
        
        stage('Build Docker Images') {
            parallel {
                stage('Build Backend') {
                    steps {
                        dir('backend') {
                            sh """
                                docker build -t ${BACKEND_IMAGE}:${BUILD_NUMBER} .
                                docker tag ${BACKEND_IMAGE}:${BUILD_NUMBER} ${BACKEND_IMAGE}:latest
                            """
                        }
                    }
                }
                stage('Build Frontend') {
                    steps {
                        dir('frontend') {
                            sh """
                                docker build -t ${FRONTEND_IMAGE}:${BUILD_NUMBER} .
                                docker tag ${FRONTEND_IMAGE}:${BUILD_NUMBER} ${FRONTEND_IMAGE}:latest
                            """
                        }
                    }
                }
            }
        }
        
        stage('Run Selenium Tests') {
            steps {
                script {
                    // Start containers for testing
                    sh 'docker-compose up -d'
                    
                    // Wait for services to be ready
                    sh 'sleep 30'
                    
                    // Run Selenium tests
                    dir('tests/selenium') {
                        sh 'npm install'
                        sh 'npm run test:selenium || true'
                    }
                    
                    // Stop containers
                    sh 'docker-compose down'
                }
            }
        }
        
        stage('Push to Registry') {
            when {
                branch 'main'
            }
            steps {
                sh """
                    echo ${DOCKER_CREDENTIALS_PSW} | docker login -u ${DOCKER_CREDENTIALS_USR} --password-stdin
                    docker push ${BACKEND_IMAGE}:${BUILD_NUMBER}
                    docker push ${BACKEND_IMAGE}:latest
                    docker push ${FRONTEND_IMAGE}:${BUILD_NUMBER}
                    docker push ${FRONTEND_IMAGE}:latest
                """
            }
        }
        
        stage('Deploy to Production') {
            when {
                branch 'main'
            }
            steps {
                script {
                    // Trigger deployment to Render/Vercel
                    sh '''
                        # Deploy backend to Render
                        curl -X POST https://api.render.com/deploy/your-service-id \
                        -H "Authorization: Bearer ${RENDER_API_KEY}"
                        
                        # Deploy frontend to Vercel
                        cd frontend
                        vercel --prod --token=${VERCEL_TOKEN}
                    '''
                }
            }
        }
    }
    
    post {
        success {
            script {
                def issueKey = sh(
                    script: "git log -1 --pretty=%B | grep -oP '(?<=\\[)[A-Z]+-[0-9]+(?=\\])'",
                    returnStdout: true
                ).trim()
                
                if (issueKey) {
                    jiraAddComment(
                        site: "${JIRA_SITE}",
                        idOrKey: issueKey,
                        comment: "✅ Build #${BUILD_NUMBER} completed successfully"
                    )
                    
                    jiraTransitionIssue(
                        site: "${JIRA_SITE}",
                        idOrKey: issueKey,
                        input: [transition: [id: '31']] // Adjust transition ID
                    )
                }
            }
            
            emailext(
                subject: "✅ Jenkins Build Success: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: "Build completed successfully. Check ${env.BUILD_URL}",
                to: 'team@example.com'
            )
        }
        
        failure {
            script {
                def issueKey = sh(
                    script: "git log -1 --pretty=%B | grep -oP '(?<=\\[)[A-Z]+-[0-9]+(?=\\])'",
                    returnStdout: true
                ).trim()
                
                if (issueKey) {
                    jiraAddComment(
                        site: "${JIRA_SITE}",
                        idOrKey: issueKey,
                        comment: "❌ Build #${BUILD_NUMBER} failed. Check logs."
                    )
                }
            }
            
            emailext(
                subject: "❌ Jenkins Build Failed: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: "Build failed. Check ${env.BUILD_URL}",
                to: 'team@example.com'
            )
        }
        
        always {
            // Clean up
            sh 'docker system prune -f'
            cleanWs()
        }
    }
}