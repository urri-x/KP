namespace KP.Storage.Repository
{
    public class Result
    {
        public bool Success { get; set; }
        public string Message { get; set; }
        public int ErrorCode { get; set; }
        public Result()
        {
            Success = false;
            Message = "";
            ErrorCode = 500;
        }
    }
}