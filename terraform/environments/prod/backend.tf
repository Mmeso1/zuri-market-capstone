terraform {
  required_version = ">= 1.11"
  required_providers { aws = { source = "hashicorp/aws", version = "~> 6.0" } }

  backend "s3" {
    bucket       = "zuri-market-tfstate"
    key          = "prod/terraform.tfstate" # dev uses "dev/terraform.tfstate"
    region       = "eu-west-1"
    encrypt      = true
    use_lockfile = true # S3 native locking, no DynamoDB table needed
  }
}