using System;
using System.Collections.Generic;
using FASTTIMEDTREELib;
using KP.Storage.Domain;
using SKStructureTree;

namespace KP.Tree
{
    public class TreeProvider : ITreeProvider
    {
        private static readonly object lockObject = new object();
        private readonly IFastTimedTreeCOM tree;
        public TreeProvider()
        {
            tree = new StructureTree();
        }

        public void InsertNodes(List<TreeNode> nodes)
        {
            ((IStructureTree)tree).InsertNodes(nodes.ToMatrix());
           
        }

        public int Count(StaffObjectType type)
        {
            lock (lockObject)
            {
                return tree.Count(type);
            }
        }
    }


}