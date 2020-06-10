import notes from '../../../data/db';

export default (req, res) => {
  notes.find({}, function (err, docs) {
    res.json(docs);
  });
}