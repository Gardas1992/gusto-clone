# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/jammy64"

  # Forward ports for API and Web
  config.vm.network "forwarded_port", guest: 4000, host: 4000  # API
  config.vm.network "forwarded_port", guest: 5173, host: 5173  # Web

  # Sync the repo into /home/vagrant/app inside the VM
  config.vm.synced_folder ".", "/home/vagrant/app", type: "virtualbox"

  # Provision script: install Docker & docker compose plugin, then run the stack
  config.vm.provision "shell", inline: <<-SHELL
    sudo apt-get update -y
    sudo apt-get install -y ca-certificates curl gnupg lsb-release
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    sudo apt-get update -y
    sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
    sudo usermod -aG docker vagrant
    sudo -u vagrant -H bash -c 'cd /home/vagrant/app && docker compose up -d --build'
  SHELL
end
