
Description: 'Template for provisioning a web server in AWS'

Resources:
  WebServerInstance:
    Type: 'AWS::EC2::Instance'
    Properties:
      ImageId: 'ami-12345678'  # Specify your desired AMI ID
      InstanceType: 't2.micro'
      SecurityGroupIds:
        - !Ref WebServerSecurityGroup
      KeyName: 'your-keypair'
      UserData:
        Fn::Base64: |
          #!/bin/bash
          yum update -y
          yum install -y httpd
          service httpd start
          chkconfig httpd on
          echo "<html><head><title>Hello World</title></head><body><h1>Hello World!</h1></body></html>" > /var/www/html/index.html

  WebServerSecurityGroup:
    Type: 'AWS::EC2::SecurityGroup'
    Properties:
      GroupDescription: 'Security group for the web server'
      SecurityGroupIngress:
        - CidrIp: '0.0.0.0/0'
          FromPort: 80
          ToPort: 80
          IpProtocol: 'tcp'
        - CidrIp: '0.0.0.0/0'
          FromPort: 443
          ToPort: 443
          IpProtocol: 'tcp'

Outputs:
  WebServerURL:
    Description: 'URL of the web server'
    Value: !Sub 'http://${WebServerInstance.PublicDnsName}'
