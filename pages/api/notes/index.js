import notes from '../../../data/db';

export default (req, res) => {
  if (req.method === 'GET') {
    notes.find({}, (err, docs) => {
      if (err) {
        res.status(500).json({ message: 'DB error', error: err });
      } else if (docs) {
        res.status(200).json(docs);
      } else if (!doc) {
        res.status(200).json({ message: 'Database is empty'});
      } else {
        res.status(500).json({ message: 'An unexpected error has occurred, please try again'});
      }
    });
  } else if (req.method === 'POST') {
    let body = JSON.parse(req.body);
    const date = new Date();
    const year = date.getFullYear();
    const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);
    const day = date.getDate();
    body.created = `${year}-${month}-${day}`
    notes.insert(body, (err, doc) => {
      res.status(200).json({ message: "Post successful", error: false, doc: doc });
    });
  } else {
    res.status(405).json({ message: "method not supported" });
  }
}
