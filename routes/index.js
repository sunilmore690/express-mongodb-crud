
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('plain.html', { title: 'Prodonus' });
  
};
exports.post = function(req, res){
  res.render('plain1.html', { title: 'Prodonus' });
};