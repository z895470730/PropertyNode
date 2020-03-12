const MongoClient = require('mongodb').MongoClient;

class DataBase {
	constructor() {
		this.url = `mongodb://127.0.0.1:27017`;
	}

	_connect(callback) {
		MongoClient.connect(this.url, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		}, (err, db) => {
			callback(err ,db);
		})
	}

	insert(collection, data, callback) {
		this._connect((err, db) => {
			if(err) throw  err;
			const dbo = db.db('property');
			dbo.collection(collection).insertOne(data, (err, res) => {
				if(err) throw err;
				callback(res, err);
				db.close();
			});
		});
	}

	find(collection, whereStr, callback) {
		//查询条件 {"name": '张三'}
		this._connect((err, db) => {
			if(err) throw err;
			const dbo = db.db('property');
			dbo.collection(collection).find(whereStr).toArray((err, res) => {
				if(err) throw err;
				callback(res, err);
				db.close();
			});
		});
	}

	relevance(collection, fromCollection, local, foreign, newPropName, callback) {
		this._connect((err, db) => {
			let dbo = db.db('property');
			dbo.collection(collection).aggregate([{
				$lookup: {
					from: fromCollection,
					localField: local,
					foreignField: foreign,
					as: newPropName
				}
			}]).toArray((err, res) => {
				if(err) throw err;
				callback(res, err)
			})
		});
	}

	delete(collection, whereStr, callback) {
		this._connect((err, db) => {
			if(err) throw err;
			const dbo = db.db('property');
			dbo.collection(collection).deleteOne(whereStr, (err, res) => {
				if(err) throw err;
				callback(res, err);
				db.close();
			});
		});
	}

	update(collection, whereStr, updateStr, callback) {
		//更新数据 updateStr = {$set: { "name" : "张三" }};
		this._connect((err, db) => {
			if(err) throw err;
			const dbo = db.db('property');
			console.log(whereStr, updateStr)
			updateStr = {$set: updateStr};
			dbo.collection(collection).updateOne(whereStr, updateStr, (err, res) => {
				if(err) throw err;
				callback(res, err);
				db.close();
			});
		});
	}
}
module.exports = DataBase;

