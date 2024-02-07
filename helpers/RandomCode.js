const GenerateRandomCode = (n)=>{
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var result = '';
    for (var i = 0; i < n; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

module.exports = {GenerateRandomCode}