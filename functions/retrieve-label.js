import faunadb, {query as q} from 'faunadb';
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET,
});

exports.handler = (event, context, cb) => {
  if (!event.queryStringParameters || !event.queryStringParameters.hash) {
    return cb(null, {
      statusCode: 500,
      body: 'Hash not provided',
    });
  }
  const hash = event.queryStringParameters.hash;
  return client
    .query(q.Get(q.Match(q.Index('domain_by_label_hash'), hash)))
    .then(ret => cb(null, {statusCode: 200, body: ret.data.label}))
    .catch(err => cb(null, {statusCode: 200, body: ''}));
};
