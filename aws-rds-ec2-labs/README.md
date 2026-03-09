## AWS RDS Deployment in Custom VPC

## Project Overview
This project demonstrates deploying Amazon RDS inside a custom VPC with secure network segmentation, private database access, and Multi-AZ high availability configuration.

The database is deployed in private subnets and is not publicly accessible, following AWS security best practices.

### Architecture 
**VPC**
- Name: MyVPC
- CIDR: 10.0.0.0/16

- Multi-AZ Deployment
### Subnet Design
**Public Subnets**
- Public-1A (10.0.1.0/24)
- Public-1B (10.0.2.0/24)
**Private Subnets**
- Private-1A (10.0.3.0/24)
- Private-1B (10.0.4.0/24)

### RDS Configuration
| Setting        | Value               |
| -------------- | ------------------- |
| Engine         | MySQL               |
| Instance Type  | db.t3.micro         |
| Multi-AZ       | Enabled             |
| Storage        | 20GB gp3            |
| Public Access  | Disabled            |
| Subnet Group   | my-rds-subnet-group |
| Security Group | RDS-SG              |

### Security Design
- RDS deployed in private subnets only
- No public IP
- Security group allows inbound traffic only from EC2 application security group
- Internet Gateway used only for public resources
- NAT Gateway used for outbound internet access

### High Availability
Multi-AZ configuration ensures:
- Automatic failover
- Synchronous replication
- Improved fault tolerance

### Architecture Diagram
```Internet → ALB → EC2 (Private) → RDS (Multi-AZ Private)```

### Key Learning Outcomes
- Creating DB Subnet Groups
- Implementing private database architecture
- Configuring secure security group rules
- Understanding Multi-AZ RDS failover
- Designing production-ready cloud database architecture

### Future Enhancements
- Add Read Replicas
- Enable Automated Backups
- Configure CloudWatch Alarms
- Enable Performance Insights
- Add Secrets Manager integration

![Architecture Diagram](./screenshots/architectural%20diagram.png)