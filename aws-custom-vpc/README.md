## AWS Custom VPC – Production-Ready Network Architecture
This project demonstrates the design and implementation of a custom AWS VPC architecture built for high availability, scalability, and secure network segmentation across multiple Availability Zones.

The VPC is designed following cloud best practices with:
- Public and private subnet separation
- Internet Gateway for public access
- NAT Gateway for secure outbound internet from private subnets
- Elastic IP allocation
- Custom route tables
- Multi-AZ deployment for fault tolerance

## Architecture Overview
| Component              | Configuration          |
| ---------------------- | ---------------------- |
| **VPC Name**           | MyVPC                  |
| **CIDR Block**         | 10.0.0.0/16            |
| **Region**             | us-east-1              |
| **Availability Zones** | us-east-1a, us-east-1b |

## Subnet Design
| Subnet Name | Availability Zone | CIDR Block  |
| ----------- | ----------------- | ----------- |
| Public-1A   | us-east-1a        | 10.0.1.0/24 |
| Public-1B   | us-east-1b        | 10.0.2.0/24 |

| Subnet Name | Availability Zone | CIDR Block     |
| ----------- | ----------------- | -------------- |
| Private-1A  | us-east-1a        | 10.0.3.0/24    |
| Private-1B  | us-east-1b        | 10.0.4.0/24 ⚠️ |

## Internet Connectivity
- **Name:** `MyIGW`
- Attached to: `MyVPC`
- Enables inbound and outbound internet traffic for public subnets.

## Public Route Table Configuration
| Destination | Target                   |
| ----------- | ------------------------ |
| 0.0.0.0/0   | Internet Gateway (MyIGW) |

## NAT Gateway
- **Name:** `MyNGW`
- Located in: `Public-1A`
- Associated with: Elastic IP
- Enables outbound internet access for private subnets

## Private Route Table Configuration
| Destination | Target              |
| ----------- | ------------------- |
| 0.0.0.0/0   | NAT Gateway (MyNGW) |

## High-Level Architecture Diagram

                         Internet
                             |
                      Internet Gateway (MyIGW)
                             |
                     -------------------------
                     |        MyVPC          |
                     |     10.0.0.0/16       |
                     -------------------------
                        |                  |
                ----------------    ----------------
                |  Public-1A   |    |  Public-1B   |
                | 10.0.1.0/24  |    | 10.0.2.0/24  |
                ----------------    ----------------
                        |
                  NAT Gateway (MyNGW)
                        |
                ----------------    ----------------
                | Private-1A  |    | Private-1B  |
                |10.0.3.0/24  |    |10.0.1.0/24* |
                ----------------    ----------------

## Design Principles Applied
- Multi-AZ High Availability
- Secure Subnet Segmentation
- Least Privilege Network Exposure
- Scalable IP Address Planning
- Cloud-Native Internet Access Pattern (NAT + IGW)

## Architecture Diagram
![Architecture Diagram](./screenshots/architecture%20diagram.png)