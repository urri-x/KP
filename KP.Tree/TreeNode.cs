using System;

namespace KP.Tree
{
    public class TreeNode
    {
        public int Id;
        public int? ParentId;
        public DateTime DateBegin;
        public DateTime? DateEnd;
        public TreeObjectType Type;

        public override string ToString()
        {
            return $"Id={Id}, ParentId={ParentId}, Type={Type},  DateBegin={DateBegin}, DateEnd={DateEnd}";
        }
    }
}