const ZARINPAL_BASE_URL = "https://payment.zarinpal.com/pg/v4/payment";

const createPayment = async ({ amount, description, mobile }) => {
  try {
    const response = await fetch(`${ZARINPAL_BASE_URL}/request.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        merchant_id: process.env.ZARINPAL_MERCHANTID,
        amount,
        description,
        callback_url: "http://localhost:3000/api/checkout/verify", // callback url address
        metadata: {
          mobile: String(mobile),
        },
      }),
    });

    const result = await response.json();

    if (result.data.code === 100) {
      return {
        success: true,
        authority: result.data.authority,
        paymentUrl: `https://payment.zarinpal.com/pg/StartPay/${result.data.authority}`,
      };
    } else {
      return {
        success: false,
        error: "Failed to create payment.",
      };
    }
  } catch (error) {
    return {
      success: false,
      error: "Server error occurred.",
    };
  }
};

const verifyPayment = async ({ authority, amount }) => {
  if (!authority || !amount) {
    throw new Error(
      "Authority and amount are required for payment verification."
    );
  }

  try {
    const response = await fetch(`${ZARINPAL_BASE_URL}/verify.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        merchant_id: process.env.ZARINPAL_MERCHANTID,
        authority,
        amount,
      }),
    });

    const result = await response.json();

    if (result.data.code === 100) {
      return { success: true, refId: result.data.ref_id };
    } else {
      return {
        success: false,
        refId: false,
        error: "Failed to verify payment.",
      };
    }
  } catch (error) {
    return {
      success: false,
      refId: false,
      error: "Server error occurred.",
    };
  }
};

export { createPayment, verifyPayment };
