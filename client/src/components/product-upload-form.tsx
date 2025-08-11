import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertProductSchema, type InsertProduct } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

export default function ProductUploadForm() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [imageInput, setImageInput] = useState("");

  const form = useForm<InsertProduct>({
    resolver: zodResolver(insertProductSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      priceInr: "",
      priceBhd: "",
      weight: "",
      stockQuantity: 1,
      imageUrls: [],
      isNewArrival: false,
      isFeatured: false,
    },
  });

  const createProductMutation = useMutation({
    mutationFn: async (data: InsertProduct) => {
      const response = await apiRequest("POST", "/api/products", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Product has been added successfully.",
      });
      form.reset();
      setImageUrls([]);
      setImageInput("");
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add product. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleAddImage = () => {
    if (imageInput.trim() && !imageUrls.includes(imageInput.trim())) {
      const newImageUrls = [...imageUrls, imageInput.trim()];
      setImageUrls(newImageUrls);
      form.setValue("imageUrls", newImageUrls);
      setImageInput("");
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImageUrls = imageUrls.filter((_, i) => i !== index);
    setImageUrls(newImageUrls);
    form.setValue("imageUrls", newImageUrls);
  };

  const onSubmit = (data: InsertProduct) => {
    if (imageUrls.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one product image.",
        variant: "destructive",
      });
      return;
    }

    createProductMutation.mutate({
      ...data,
      imageUrls,
    });
  };

  return (
    <section className="bg-white py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-black mb-4">Product Upload</h2>
          <p className="text-lg text-gray-600">Add new products to the catalog</p>
        </div>

        <div className="bg-gray-50 rounded-xl p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter product name" {...field} data-testid="input-product-name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-category">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="gold">Gold</SelectItem>
                          <SelectItem value="silver">Silver</SelectItem>
                          <SelectItem value="diamonds">Diamonds</SelectItem>
                          <SelectItem value="new-arrivals">New Arrivals</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="priceInr"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price (INR)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Price in Indian Rupees" {...field} data-testid="input-price-inr" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="priceBhd"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price (BHD)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" placeholder="Price in Bahraini Dinar" {...field} data-testid="input-price-bhd" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="stockQuantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stock Quantity</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Available quantity" {...field} onChange={(e) => field.onChange(parseInt(e.target.value) || 0)} data-testid="input-stock" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Weight (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Product weight" {...field} data-testid="input-weight" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Description</FormLabel>
                    <FormControl>
                      <Textarea rows={4} placeholder="Detailed product description" {...field} data-testid="textarea-description" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Image URLs */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Images</label>
                <div className="space-y-4">
                  <div className="flex space-x-2">
                    <Input
                      type="url"
                      placeholder="Enter image URL"
                      value={imageInput}
                      onChange={(e) => setImageInput(e.target.value)}
                      className="flex-1"
                      data-testid="input-image-url"
                    />
                    <Button
                      type="button"
                      onClick={handleAddImage}
                      variant="outline"
                      data-testid="button-add-image"
                    >
                      Add Image
                    </Button>
                  </div>

                  {imageUrls.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {imageUrls.map((url, index) => (
                        <div key={index} className="relative">
                          <img
                            src={url}
                            alt={`Product image ${index + 1}`}
                            className="w-full h-24 object-cover rounded-md"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                            data-testid={`remove-image-${index}`}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Additional Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isNewArrival"
                    {...form.register("isNewArrival")}
                    className="rounded border-gray-300 focus:ring-2 focus:ring-gold"
                    data-testid="checkbox-new-arrival"
                  />
                  <label htmlFor="isNewArrival" className="text-sm font-medium text-gray-700">
                    Mark as New Arrival
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isFeatured"
                    {...form.register("isFeatured")}
                    className="rounded border-gray-300 focus:ring-2 focus:ring-gold"
                    data-testid="checkbox-featured"
                  />
                  <label htmlFor="isFeatured" className="text-sm font-medium text-gray-700">
                    Mark as Featured
                  </label>
                </div>
              </div>
              
              <div className="text-center pt-6">
                <Button
                  type="submit"
                  disabled={createProductMutation.isPending}
                  className="bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 transition-colors font-semibold"
                  data-testid="button-upload-product"
                >
                  {createProductMutation.isPending ? "Uploading..." : "Upload Product"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
