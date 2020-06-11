using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MVPStudioReactTemplate.Models
{
    public class Product
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [MaxLength(255)]
        public string Name { get; set; }
        [Required]
        [Column(TypeName = "decimal(18,2)")]
        [RegularExpression("([0-9]{1,5})([.]([0-9]{2}))?")]
        public decimal Price { get; set; }
    }
}