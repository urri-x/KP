using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using NUnit.Framework;
using FluentAssertions;

namespace KP.Tree.UnitTests
{
    [TestFixture]
    public class TreeProviderTests
    {
        [Test]
        public void InsertNodes_IncrementsCount()
        {
            var treeProvider = new TreeProvider();
            treeProvider.InsertNodes(new List<TreeNode>()
            {
                new TreeNode() {Id = 1, ParentId = null, DateBegin = new DateTime(2016, 1, 1), DateEnd = null, Type = 1}
            });
            treeProvider.Count(1).Should().Be(1);
        }

        [Test]
        public void ThreadSafety_Test()
        {
            var treeProvider = new TreeProvider();
            const int threadsCount = 10;
            const int nodesCount = 10000;
            var threads = new Thread[threadsCount];
            var startEvent = new ManualResetEvent(false);
            var exceptions = new List<Exception>();
            var id = 0;
            var createdNodes = new List<int>();
            var random = new Random();

            var threadLock = new object();
            for (var i = 0; i < threads.Length; i++)
            {
                threads[i] = new Thread(() =>
                {
                    try
                    {
                        for (var k = 0; k < nodesCount; k++)
                        {
                            int newId;
                            int? newParentId = null;
                            lock (threadLock)
                                newId = ++id;

                            lock (createdNodes)
                                if (createdNodes.Count>10)
                                    newParentId = createdNodes[random.Next(createdNodes.Count-1)];


                            var node = new TreeNode()
                            {
                                Id = newId,
                                ParentId = newParentId,
                                DateBegin = new DateTime(2010, 1, 1).AddDays(random.Next(2000)),
                                DateEnd = null,
                                Type = 1
                            };
                            treeProvider.InsertNodes(new List<TreeNode>(){node});
                            lock (createdNodes)
                                createdNodes.Add(newId);

                        }
                    }
                    catch (Exception e)
                    {
                        lock (exceptions)
                            exceptions.Add(e);
                    }
                });
                threads[i].Start();
            }
            startEvent.Set();
            foreach (var t in threads)
                Assert.That(t.Join(TimeSpan.FromSeconds(2)));
            if (exceptions.Any())
                throw new AggregateException(exceptions);
            treeProvider.Count(1).Should().Be(threadsCount*nodesCount);
        }
        

    }
}