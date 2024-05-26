#Installing nodeJS
Write-Output "=> Installing Nodejs...`n"
winget install nodejs --verbose --disable-interactivity;

#Installing Insomnia
Write-Output "`nInstalling Insomnia...`n"
winget install Insomnia.Insomnia --verbose --disable-interactivity;

#Installing Docker
Write-Output "`nInstalling Docker...`n"
winget install docker.dockerdesktop --verbose --disable-interactivity

#Installing Nest JS
Write-Output "`nInstalling Nest JS...`n"
npm install -g @nestjs/cli --verbose;