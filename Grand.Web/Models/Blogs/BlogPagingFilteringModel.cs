using Grand.Framework.UI.Paging;
using System;

namespace Grand.Web.Models.Blogs
{
    public partial class BlogPagingFilteringModel : BasePageableModel
    {
        #region Methods

        public virtual DateTime? GetParsedMonth()
        {
            DateTime? result = null;
            if (!String.IsNullOrEmpty(this.Month))
            {
                string[] tempDate = this.Month.Split(new [] { '-' });
                if (tempDate.Length == 2)
                {
                    result = new DateTime(Convert.ToInt32(tempDate[0]), Convert.ToInt32(tempDate[1]), 1);
                }
            }
            return result;
        }
        public virtual DateTime? GetFromMonth()
        {
            var filterByMonth = GetParsedMonth();
            if (filterByMonth.HasValue)
                return filterByMonth.Value;
            return null;
        }
        public virtual DateTime? GetToMonth()
        {
            var filterByMonth = GetParsedMonth();
            if (filterByMonth.HasValue)
                return filterByMonth.Value.AddMonths(1).AddSeconds(-1);
            return null;
        }
        #endregion

        #region Properties

        public string Month { get; set; }

        public string Tag { get; set; }
        
        public string CategoryId { get; set; }
        
        public string SearchKeyword { get; set; }

        #endregion
    }
}