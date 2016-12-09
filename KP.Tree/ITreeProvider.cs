using System.Collections.Generic;
using KP.Storage.Domain;

namespace KP.Tree
{
    public interface ITreeProvider
    {
        void InsertNodes(List<TreeNode> nodes);
        int Count(StaffObjectType type);
    }
}