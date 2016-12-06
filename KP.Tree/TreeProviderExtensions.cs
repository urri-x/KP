using System;
using System.Collections.Generic;

namespace KP.Tree
{
    public static class TreeProviderExtensions
    {
        public static dynamic[,] ToMatrix(this List<TreeNode> nodes)
        {
            dynamic[,] result = new dynamic[5, nodes.Count];
            int i = 0;
            foreach (var node in nodes)
            {
                result[0, i] = node.Id;
                result[1, i] = node.ParentId;
                result[2, i] = node.DateBegin;
                result[3, i] = node.DateEnd;
                result[4, i] = node.Type;
                i++;
            }
            return result;
        }
    }
}