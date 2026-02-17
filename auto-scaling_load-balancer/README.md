# Auto Scaling + Application Load Balancer Deployment

## Project Overview
This project demonstrates the deployment of a highly available and scalable web application architecture on Amazon Web Services using:
- Amazon EC2
- Amazon EC2 Auto Scaling
- Elastic Load Balancing

The infrastructure ensures:
- High availability across multiple Availability Zones
- Automatic scaling based on demand
- Fault tolerance through health checks and instance replacement
- Internet-facing traffic distribution

## Architecture Diagram
![Architecture Diagram](./screenshots/architecture%20diagram.png)

## Architecture Components
### Application Load Balancer (ALB)
- Internet-facing
- Listens on HTTP (Port 80)
- Distributes incoming traffic across EC2 instances
- Performs health checks
### Target Group
- Routes requests to healthy instances only
- Automatically removes unhealthy instances
### Auto Scaling Group (ASG)
- Minimum: 2 instances
- Desired: 2 instances
- Maximum: 4 instances
- Automatically replaces terminated or unhealthy instances
### EC2 Instances
- Amazon Linux 2023
- Nginx installed via User Data script
- Custom index page showing hostname

## Implementation Steps
### Launch Template
Configured with:
- AMI: Amazon Linux 2023
- Instance type: t2.micro
- Security Group: HTTP (80) + SSH (22)
- User Data script:
```
#!/bin/bash
sudo dnf update -y
sudo dnf install nginx -y
sudo systemctl start nginx
sudo systemctl enable nginx
echo "<h1>Hello from $(hostname)</h1>" > /usr/share/nginx/html/index.html
```
### Application Load Balancer
- Internet-facing
- Attached to target group
- Deployed across multiple subnets
### Auto Scaling Configuration
- Health check type: ELB
- Automatic instance replacement enabled
- Multi-AZ deployment

## Key Concepts Demonstrated
- High Availability Architecture
- Elastic Scaling
- Load Balancing
- Health Checks
- Infrastructure Automation via Launch Templates
- Multi-AZ Deployment Strategy

## Key Concepts Demonstrated
- Security Groups configured for least privilege
- SSH access restricted to personal IP
- HTTP exposed publicly for web traffic

## Security Configuration
- Security Groups configured for least privilege
- SSH access restricted to personal IP
- HTTP exposed publicly for web traffic