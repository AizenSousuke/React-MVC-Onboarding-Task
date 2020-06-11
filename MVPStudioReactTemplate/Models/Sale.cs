using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MVPStudioReactTemplate.Models
{
    public class Sale
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        public string DateSold { get; set; }
        [Required]
        public Product Product { get; set; }
        [Required]
        public Customer Customer { get; set; }
        [Required]
        public Store Store { get; set; }
    }
}