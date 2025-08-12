export function openWhatsApp(productName: string, price: string, description: string) {
  const phoneNumber = '+919597201554';
  const message = `Hi! I'm interested in the ${productName} priced at ${price}. 

Product Details:
${description}

.Could you please provide more information about this item? Thank you!`;

  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(whatsappURL, '_blank');
}
