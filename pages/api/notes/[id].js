import notes from '../../../data/db';

export default (req, res) => {
  if (req.method === 'GET') {
    const { query: { id } } = req
    notes.findOne({ _id: id }, (err, doc) => {
      if (err) {
        console.log(err);
        res.statusCode = 500;
        res.json({ message: 'DB error' });
      } else if (doc) {
        console.log(doc);
        res.statusCode = 200;
        res.json({ message: 'Query successful', doc: doc });
      } else if (!doc) {
        res.statusCode = 200;
        res.json({ message: 'ID not found in database'});
      } else {
        res.statusCode = 500;
        res.json({ message: 'An unexpected error has occurred, please try again'});
      }
    });
  } else {
    console.log(req);
    res.statusCode = 405;
    res.json({ message: "method not supported" });
  }
}
