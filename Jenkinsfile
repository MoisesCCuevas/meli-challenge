pipeline {
  agent any
  tools {
    nodejs '24.1.0'
  }

  options {
    timeout(time: 6, unit: 'MINUTES')
  }

  stages {
    stage('Install dependencies') {
      steps {
        bat 'npm i'
      }
    }
    stage('Run tests') {
      steps {
        bat 'npm run test'
      }
    }
  }
}
