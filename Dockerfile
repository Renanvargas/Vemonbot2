pkg update && pkg upgrade -y
pkg install nodejs git -y
git clone https://github.com/Renanvargas/Vemonbot2.git
cd Vemonbot2
npm install
node index.js
