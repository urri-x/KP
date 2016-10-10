using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using KP.Storage.Repository;
using MongoDB.Bson;
using MongoDB.Driver;

namespace KP.Storage
{
    public class MongoRepository : IRepository
    {
        private readonly IMongoClient mongoClient;
        private readonly IMongoDatabase mongoDatabase;

        public MongoRepository(string connectionString, string databaseName)
            : this(new MongoClient(connectionString), databaseName)
        {
        }

        public MongoRepository(IMongoClient mongoClient, string databaseName)
        {
            this.mongoClient = mongoClient;
            mongoDatabase = mongoClient.GetDatabase(databaseName);
        }

        public async Task<IEnumerable<TEntity>> GetAll<TEntity>() where TEntity : class, new()
        {
            var collection = GetCollection<TEntity>();
            return collection.Find(new BsonDocument()).ToEnumerable();
        }

        public async Task Insert<TEntity>(TEntity item) where TEntity : class, new()
        {
            var collection = GetCollection<TEntity>();
            await collection.InsertOneAsync(item);
        }

        private IMongoCollection<TEntity> GetCollection<TEntity>()
        {
            return mongoDatabase.GetCollection<TEntity>(typeof(TEntity).Name);
        }

    }
}