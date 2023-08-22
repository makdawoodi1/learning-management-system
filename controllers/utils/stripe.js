export const createStripeCustomer = async (req, res, ) => {
  try {
    let customer = await stripe.customers.create({
      name: firstname,
      email: email,
      payment_method: payment_method_id,
      metadata: {
        firstname: firstname,
        lastname: lastname,
        user_id: link_token,
      },
    });

    await prisma.orders.update({
      where: { link_token: link_token },
      data: { stripe_customer_id: customer.id },
    });

    return customer;
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating stripe customer",
      error,
    });

    console.log(error);
  }
};
