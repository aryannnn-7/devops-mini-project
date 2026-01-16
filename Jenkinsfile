pipeline {
    agent any
    
    tools {
        nodejs 'NodeJS-18'
    }
    
    environment {
        DOCKER_USERNAME = 'aryannn07'
        BACKEND_IMAGE = "${DOCKER_USERNAME}/legal-rights-backend"
        FRONTEND_IMAGE = "${DOCKER_USERNAME}/legal-rights-frontend"
        PROJECT_PATH = 'C:/Users/ARYAN/OneDrive/Desktop/legal-rights-portal-3'
        JIRA_SITE = 'Legal-Rights-Jira'
        JIRA_ISSUE = 'CRM-8'
    }
    
    stages {
        stage('Checkout') {
            steps {
                script {
                    echo '📥 Using local project files...'
                    echo "Project location: ${PROJECT_PATH}"
                    
                    try {
                        jiraAddComment(
                            site: "${JIRA_SITE}",
                            idOrKey: "${JIRA_ISSUE}",
                            comment: "🔵 *Build #${BUILD_NUMBER} Started*\n\nJenkins CI/CD pipeline initiated."
                        )
                        
                        jiraTransitionIssue(
                            site: "${JIRA_SITE}",
                            idOrKey: "${JIRA_ISSUE}",
                            input: [transition: [name: 'In Progress']]
                        )
                    } catch (Exception e) {
                        echo "⚠️ Jira update: ${e.message}"
                    }
                }
            }
        }
        
        stage('Install Dependencies') {
            parallel {
                stage('Backend Dependencies') {
                    steps {
                        dir("${PROJECT_PATH}/server") {
                            echo '📦 Installing backend dependencies...'
                            bat 'npm install'
                        }
                    }
                }
                stage('Frontend Dependencies') {
                    steps {
                        dir("${PROJECT_PATH}/client") {
                            echo '📦 Installing frontend dependencies...'
                            bat 'npm install'
                        }
                    }
                }
            }
        }
        
        stage('Build Docker Images') {
            parallel {
                stage('Build Backend') {
                    steps {
                        dir("${PROJECT_PATH}/server") {
                            echo '🐳 Building backend image...'
                            bat "docker build -t ${BACKEND_IMAGE}:${BUILD_NUMBER} ."
                            bat "docker tag ${BACKEND_IMAGE}:${BUILD_NUMBER} ${BACKEND_IMAGE}:latest"
                        }
                    }
                }
                stage('Build Frontend') {
                    steps {
                        dir("${PROJECT_PATH}/client") {
                            echo '🐳 Building frontend image...'
                            bat "docker build -t ${FRONTEND_IMAGE}:${BUILD_NUMBER} ."
                            bat "docker tag ${FRONTEND_IMAGE}:${BUILD_NUMBER} ${FRONTEND_IMAGE}:latest"
                        }
                    }
                }
            }
        }
        
        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', 
                                                 usernameVariable: 'DOCKER_USER', 
                                                 passwordVariable: 'DOCKER_PASS')]) {
                    echo '📤 Logging into Docker Hub...'
                    bat 'echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin'
                    
                    echo 'Pushing backend images...'
                    bat "docker push ${BACKEND_IMAGE}:${BUILD_NUMBER}"
                    bat "docker push ${BACKEND_IMAGE}:latest"
                    
                    echo 'Pushing frontend images...'
                    bat "docker push ${FRONTEND_IMAGE}:${BUILD_NUMBER}"
                    bat "docker push ${FRONTEND_IMAGE}:latest"
                }
            }
        }
        
        stage('Deploy') {
            steps {
                dir("${PROJECT_PATH}") {
                    echo '🚀 Deploying application...'
                    bat 'docker-compose down || exit /b 0'
                    bat 'ping 127.0.0.1 -n 6 > nul'
                    bat 'docker-compose up -d'
                }
            }
        }
    }
    
    post {
        success {
            script {
                echo '✅ Pipeline completed successfully!'
                
                try {
                    jiraAddComment(
                        site: "${JIRA_SITE}",
                        idOrKey: "${JIRA_ISSUE}",
                        comment: "✅ *Build #${BUILD_NUMBER} Completed!*\n\n" +
                                 "📦 Images:\n* ${BACKEND_IMAGE}:${BUILD_NUMBER}\n* ${FRONTEND_IMAGE}:${BUILD_NUMBER}\n\n" +
                                 "🚀 Application deployed successfully!"
                    )
                    
                    jiraTransitionIssue(
                        site: "${JIRA_SITE}",
                        idOrKey: "${JIRA_ISSUE}",
                        input: [transition: [name: 'Done']]
                    )
                } catch (Exception e) {
                    echo "⚠️ Jira update: ${e.message}"
                }
            }
        }
        failure {
            script {
                try {
                    jiraAddComment(
                        site: "${JIRA_SITE}",
                        idOrKey: "${JIRA_ISSUE}",
                        comment: "❌ Build #${BUILD_NUMBER} failed!\n\nCheck: ${BUILD_URL}console"
                    )
                } catch (Exception e) {
                    echo "⚠️ Jira update: ${e.message}"
                }
            }
        }
        always {
            bat 'docker system prune -f || exit /b 0'
        }
    }
}
```

Save the file!

---

### **Step 2: Update Your Jenkins Job to Use the Jenkinsfile**

1. Go to Jenkins: http://localhost:8080
2. Click on **Legal-Rights-Pipeline**
3. Click **Configure**
4. Scroll to **Pipeline** section
5. Change settings:

**FROM:**
```
Definition: Pipeline script
Script: [your long script here]
```

**TO:**
```
Definition: Pipeline script from SCM
SCM: None (or "Git" if you have repo)

Script Path: Jenkinsfile

⚠️ Since you don't have Git integrated yet, use this workaround:
```

**For local files without Git:**
```
Definition: Pipeline script
Script: DELETE everything and paste this ONE LINE:

load 'C:/Users/ARYAN/OneDrive/Desktop/legal-rights-portal-3/Jenkinsfile'