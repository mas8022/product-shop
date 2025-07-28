const createPayment = async ({ amount, mobile }) => {
  try {
    const response = await fetch("https://gateway.zibal.ir/v1/request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        merchant: process.env.ZIBAL_MERCHANTID,
        amount,
        callbackUrl: `${process.env.HOST_NAME}/api/checkout/verify`,
        mobile,
      }),
    });

    const result = await response.json();

    if (result.result === 100) {
      return {
        success: true,
        authority: result.trackId,
        paymentUrl: `https://gateway.zibal.ir/start/${result.trackId}`,
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

const verifyPayment = async ({ trackId }) => {
  if (!trackId) {
    throw new Error("Track ID is required for payment verification.");
  }

  try {
    const response = await fetch("https://gateway.zibal.ir/v1/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        merchant: process.env.ZIBAL_MERCHANTID,
        trackId,
      }),
    });

    const result = await response.json();
    
    if (result.result === 100) {
      return { success: true };
    } else {
      return {
        success: false,
        error: "Failed to verify payment.",
      };
    }
  } catch (error) {
    return {
      success: false,
      error: "Server error occurred.",
    };
  }
};

export { createPayment, verifyPayment };
