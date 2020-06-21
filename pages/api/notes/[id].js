import notes from '../../../data/db';

export default (req, res) => {
  if (req.method === 'GET') {
    const { query: { id } } = req;
    notes.findOne({ _id: id }, (err, doc) => {
      if (err) {
        res.status(500).json({ message: 'DB error', error: err });
      } else if (doc) {
        res.status(200).json({ message: 'Query successful', doc: doc });
      } else if (!doc) {
        res.status(200).json({ message: 'ID not found in database'});
      } else {
        res.status(500).json({ message: 'An unexpected error has occurred, please try again'});
      }
    });
  } else if (req.method === 'PUT') {
    const { query: { id }, body } = req;
    notes.update({ _id: id }, JSON.parse(body), (err, doc) => {
      if (err) {
        res.status(500).json({ message: 'DB error', error: err });
      } else if (doc) {
        res.status(200).json({ message: 'Document successfully updated', doc: doc });
      } else if (!doc) {
        res.status(200).json({ message: 'ID not found in database, update failed'});
      } else {
        res.status(500).json({ message: 'An unexpected error has occurred, please try again'});
      }
    });
  } else if (req.method === 'DELETE') {
    const { query: { id } } = req;
    notes.remove({ _id: id }, {}, (err, numRemoved) => {
      if (err) {
        res.status(500).json({ message: 'DB error', error: err });
      } else if (numRemoved) {
        res.status(200).json({ message: 'Document successfully deleted', numRemoved: numRemoved });
      } else if (!numRemoved) {
        res.status(200).json({ message: 'ID not found in database, delete failed'});
      } else {
        res.status(500).json({ message: 'An unexpected error has occurred, please try again'});
      }
    });
  } else {
    res.status(405).json({ message: "method not supported" });
  }
}
