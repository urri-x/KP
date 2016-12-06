using System.Collections.Generic;
using FASTTIMEDTREELib;
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

        public int Count(TreeObjectType type)
        {
            lock (lockObject)
            {
                return tree.Count(type);
            }
        }
    }

    public enum TreeObjectType
    {
        Organization = 2,
        Department = 3,
        StaffPosition = 4,
        Employee = 5
    }
}