using System.Collections.Generic;
using Xunit;

public class ExampleUnitTest
{
    // Simulate a local API method
    private List<Product> GetProducts()
    {
        // Simulated response data
        return new List<Product>
        {
            new Product { Id = 1, Title = "Mock Product 1" },
            new Product { Id = 2, Title = "Mock Product 2" }
        };
    }

    [Fact]
    public void Test_SimulateFetchProducts()
    {
        // Act: Call the simulated API
        var products = GetProducts();

        // Assert: Verify the simulated response
        Assert.NotNull(products);
        Assert.Equal(2, products.Count);
        Assert.Contains(products, p => p.Title == "Mock Product 1");
    }

    // Class to represent a product
    private class Product
    {
        public int Id { get; set; }
        public string Title { get; set; }
    }
}
