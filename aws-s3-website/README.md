## Deploying a React App to Amazon S3
A step-by-step guide to hosting your React application as a static website on AWS S3, with an optional CloudFront CDN setup for HTTPS and global performance.

Developer Machine
      │
      ▼
[npm run build] ──► build/ folder (HTML, CSS, JS)
      │
      ▼ aws s3 sync
      │
┌─────────────────────────────┐
│         Amazon S3           │
│  Static Website Hosting     │
│  + Public Bucket Policy     │
└─────────────────────────────┘
      │
      ▼ (Optional — Recommended for Production)
┌──────────────────────────────────────────────┐
│  Route 53  ──►  ACM Cert  ──►  CloudFront   │
│  (Domain)     (HTTPS/SSL)    (CDN + Cache)   │
└──────────────────────────────────────────────┘
      │
      ▼
  🌐 Browser — React app loads & runs client-side

##  Prerequisites
- Node.js and npm installed
- An AWS account
- AWS CLI installed and configured

### Configure AWS CLI with your credentials:
```bashaws configure```

### Step 1 — Build Your React App
```npm run build```
This creates a ```build/``` folder (or ```dist/``` if using Vite) containing optimized static files — HTML, CSS, and JavaScript — ready for deployment.

### Step 2 — Create an S3 Bucket
- Go to the **AWS S3 Console**
- Click **Create bucket**
- Enter a unique **bucket name** (e.g., my-react-app-2024)
- Choose your preferred **AWS Region**
- Under **Block Public Access** settings, uncheck **"Block all public access"** and confirm the warning
- Click **Create bucket**
⚠️ S3 bucket names are globally unique. Choose something specific to your project.

### Step 3 — Enable Static Website Hosting
- Open your bucket and go to the **Properties** tab
- Scroll to **Static website** hosting and click **Edit**
- Select **Enable**
- Set Index document to ```index.html```
- Set Error document to ```index.html``` *(critical for React Router — prevents 404 on page refresh)*
- Click **Save changes**

### Step 4 — Set a Public Bucket Policy
- Go to the **Permissions** tab in your bucket
- Click **Bucket policy → Edit**
- Paste the following policy (replace ```your-bucket-name``` with your actual bucket name):
```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::your-bucket-name/*"
    }
  ]
}
```
- Click **Save changes**

### Step 5 — Upload Your Build Files
- Open your S3 bucket and click Upload
- Click Add files and select all files inside the build/ folder
- Click Add folder to also include sub-folders
- Click Upload
⚠️ Upload the contents of ```build/```, not the folder itself. ```index.html``` must be at the root of your bucket.

## Optional (But Recommended) — Add CloudFront for HTTPS & Performance
S3 static hosting serves over HTTP only. For production apps, use CloudFront to get:

- HTTPS (SSL/TLS)
- Global CDN edge caching
- Custom domain support
- Better performance worldwide

### Setup CloudFront
- Go to the CloudFront Console → Create distribution
- Set Origin domain to your S3 website endpoint (not the bucket URL)
- Set Default root object to ```index.html```
- Under Error pages, add a custom error response:
    - HTTP error code: ```403``` and ```404```
    - Response page path: ```/index.html```
    - HTTP response code: ```200```
    *(This ensures React Router works correctly on direct URL access)*
- Click Create distribution and wait for it to deploy (~5–10 minutes)

Your app will now be served at a CloudFront URL like:
```https://d1234abcd.cloudfront.net```

### Add a Custom Domain (Optional)
- Register a domain in Route 53 or use an existing one
- Request a free SSL certificate via AWS Certificate Manager (ACM) in us-east-1 region
- Attach the ACM certificate to your CloudFront distribution
- Add a Route 53 A record (alias) pointing to your CloudFront distribution

