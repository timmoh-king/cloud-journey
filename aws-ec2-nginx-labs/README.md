# AWS EC2 + Nginx Deployment Lab

## Objective
Deploy a live Nginx web server on AWS EC2.

## Steps Performed
#### 1. Launched EC2 instance (Amazon Linux 2023)
![Launch Instance](./screenshots/launch_instance.png)
#### 2. Configured security group (SSH + HTTP)
![Security Group](./screenshots/configure_security_group.png)
#### 3. Connected via SSH
![Server SSH](./screenshots/ssh_to_server.png)
#### 4. Installed and started Nginx
![Install SSH](./screenshots/ngnix_running.png)
#### 5. Accessed server via browser
![NGNIX Browser](./screenshots/welcome_browser.png)

## Commands Used

### SSH
```ssh -i nginx-key.pem ec2-user@PUBLIC_IP```

### Install Nginx
```
sudo dnf update -y
sudo dnf install nginx -y
sudo systemctl start nginx
sudo systemctl enable nginx
```

## Outcome
Successfully deployed a live web server accessible over the internet.
