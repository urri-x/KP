using System.Collections.Generic;

namespace KP.Tree
{
    public interface ITreeProvider
    {
        void InsertNodes(List<TreeNode> nodes);
        int Count(TreeObjectType type);
    }
}