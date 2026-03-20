## What We Are Building in Terraform
In this project, we will be building a simple web application infrastructure on AWS using Terraform. The infrastructure will consist of the following components:
- VPC (public + private subnets)
- Internet Gateway + NAT Gateway
- Security Groups
- EC2 Launch Template
- Auto Scaling Group
- Application Load Balancer
- Target Group
- RDS (MySQL)
- S3 Bucket

## Architecture Diagram
<img src="screenshots/architecture%20diagram.png" alt="Architecture Diagram" width="600">

## Project Structure
```
aws-capstone-terraform/
│
├── provider.tf
├── variables.tf
├── main.tf
├── outputs.tf
├── terraform.tfvars
├── .gitignore
```

## Prerequisites
Before deploying this infrastructure, ensure you have the following:
- AWS CLI installed and configured with appropriate permissions
- Terraform v1.0+ installed
- An AWS account with the necessary IAM permissions to create VPC, EC2, RDS, and S3 resources

## Deployment Instructions

1. **Update variables:**
   Edit `terraform.tfvars` to set your desired values, especially the `db_password`.

2. **Clone or navigate to the Terraform directory:**
   ```bash
   cd aws-capstone-project/Terraform
   ```

3. **Initialize Terraform:**
   ```bash
   terraform init
   ```

4. **Review the plan:**
   ```bash
   terraform plan
   ```

5. **Apply the configuration:**
   ```bash
   terraform apply
   ```

6. **Confirm the deployment** by typing `yes` when prompted.

## Usage
Once deployed, you can:
- Access the web application via the ALB DNS name (output: `alb_dns`)
- The application runs on EC2 instances in an Auto Scaling Group
- Database connections can be made to the RDS MySQL instance
- Static assets can be stored in the S3 bucket

## Infrastructure Components Details
- **VPC**: Custom VPC with public and private subnets across two availability zones
- **Internet Gateway & NAT Gateway**: For internet access from public and private subnets respectively
- **Security Groups**: Configured for ALB (port 80) and application instances
- **EC2 Launch Template**: Defines the AMI and user data for web servers
- **Auto Scaling Group**: Maintains 2-4 instances based on demand
- **Application Load Balancer**: Distributes traffic to the EC2 instances
- **RDS MySQL**: Database instance for application data
- **S3 Bucket**: For static file storage

## Cleanup
To destroy the infrastructure:
```bash
terraform destroy
```

## Learning Objectives
This capstone project demonstrates:
- Infrastructure as Code using Terraform
- AWS networking concepts (VPC, subnets, gateways)
- Load balancing and auto scaling
- Database deployment in AWS
- Best practices for cloud infrastructure deployment
