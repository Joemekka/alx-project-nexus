import React, { useEffect, useState } from 'react';
import Nav from '@/components/layouts/Nav';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { ShippingProps } from '@/interfaces';

const Checkout = () => {
  const { state } = useCart();
  const products = state.items;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [order, setOrder] = useState<ShippingProps>({
    shipping: {
      fullName: '',
      email: '',
      phoneNumber: '',
      address: '',
      country: 'United States',
    },
    billing: {
      cardName: '',
      cardNumber: '',
      cardExpiry: '',
      cardCVV: '',
      useShipping: false,
    },
    billingShipping: {
      phoneNumber: '',
      country: 'United States',
      address: '',
    },
    status: 'pending',
    paymentMethod: '',
  });

  // Handle shipping input changes
  const handleShippingChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setOrder((prev) => ({
      ...prev,
      shipping: {
        ...prev.shipping,
        [name]: value,
      },
    }));
  };
  const handleBillingShippingChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setOrder((prev) => ({
      ...prev,
      billingShipping: {
        ...prev.billingShipping,
        [name]: value,
      },
    }));
  };

  // Handle billing input changes
  const handleBillingChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    // Narrow the target to the possible element types and safely
    // read checked only when the element is an input (checkbox).
    const target = e.target as
      | HTMLInputElement
      | HTMLSelectElement
      | HTMLTextAreaElement;
    const name = target.name;
    const value = target.value;
    const isCheckbox = (target as HTMLInputElement).type === 'checkbox';
    const valueToSet: any = isCheckbox
      ? (target as HTMLInputElement).checked
      : value;

    setOrder((prev) => ({
      ...prev,
      billing: {
        ...prev.billing,
        [name]: valueToSet,
      },
    }));
  };

  // Handle payment method change
  const handlePaymentMethodChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setOrder((prev) => ({
      ...prev,
      paymentMethod: e.target.value,
    }));
  };

  const validateShipping = () => {
    return (
      order.shipping.fullName.trim() !== '' &&
      order.shipping.phoneNumber.trim() !== '' &&
      order.shipping.email.trim() !== '' &&
      order.shipping.address.trim() !== '' &&
      order.shipping.country.trim() !== ''
    );
  };
  const validateBillingShipping = () => {
    return (
      order.billingShipping.country.trim() !== '' &&
      order.billingShipping.phoneNumber.trim() !== '' &&
      order.billingShipping.address.trim() !== ''
    );
  };

  const validatePayment = () => {
    if (order.paymentMethod === '') return false;

    // COD or PayPal → only shipping needed
    if (order.paymentMethod === 'cod' || order.paymentMethod === 'paypal') {
      return true;
    }

    // CARD payment → card fields must be filled
    const cardValid =
      order.billing.cardName.trim() !== '' &&
      order.billing.cardNumber.trim() !== '' &&
      order.billing.cardExpiry.trim() !== '' &&
      order.billing.cardCVV.trim() !== '';

    if (!cardValid) return false;

    // CARD + useShipping = true → billing shipping form not required
    if (order.billing.useShipping) return true;

    // CARD + useShipping = false → billing shipping form must be filled
    return validateBillingShipping();
  };

  // Final form validation
  const isFormValid = validateShipping() && validatePayment();

  // Submit order
  const handleSubmitOrder = () => {
    if (!isFormValid) {
      alert('Please fill all required fields!');
      return;
    }

    // Create a copy of the order
    let finalOrder: ShippingProps = { ...order };

    // Merge shipping info into billing if useShipping is checked
    if (order.billing.useShipping) {
      finalOrder.billing = { ...finalOrder.billing, ...finalOrder.shipping };
    }

    // Set order status based on payment method
    if (order.paymentMethod === 'card' || order.paymentMethod === 'paypal') {
      finalOrder.status = 'awaiting-payment';
    } else {
      finalOrder.status = 'Order Placed';
    }

    console.log('Final Order:', finalOrder);
    // TODO: send finalOrder to backend or API
  };
  return (
    <>
      <div className="bg-(--secondryColor) mb-5">
        <Nav />
      </div>
      {!mounted ? null : (
        <div className="flex max-md:flex-col gap-3.5  w-[90%] mx-auto items-start mb-10">
          <div className="flex flex-col gap-5 w-[69%] max-md:w-full  ">
            <div className=" flex flex-col justify-start  shadow-md rounded-md bg-[#F7F7F7] w-full">
              <form
                action=""
                className="max-md:flex max-md:flex-col max-md:gap-2.5  p-10 "
              >
                <h3 className="text-2xl">Shipping Details</h3>
                <div className="grid grid-cols-1 grid-rows-4 max-md:gap-2.5">
                  <div className="flex max-md:flex-wrap  gap-3.5 items-center">
                    <div className="flex flex-col flex-1">
                      <label htmlFor="fname">Full Name</label>
                      <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        className="border"
                        onChange={handleShippingChange}
                        required
                        value={order.shipping.fullName}
                      />
                    </div>
                    <div className="flex flex-col flex-1">
                      <label htmlFor="phoneNumber">Phone Number</label>
                      <input
                        type="text"
                        name="phoneNumber"
                        className="border"
                        placeholder="Phone Number"
                        onChange={handleShippingChange}
                        required
                        value={order.shipping.phoneNumber}
                      />
                    </div>
                  </div>

                  <div className="flex max-md:flex-wrap gap-3.5 items-center">
                    <div className="flex flex-col flex-1">
                      <label htmlFor="email">Email Address</label>
                      <input
                        type="text"
                        name="email"
                        className="border"
                        placeholder="Email"
                        onChange={handleShippingChange}
                        required
                        value={order.shipping.email}
                      />
                    </div>
                    <div className="flex flex-col flex-1">
                      <label htmlFor="">Select Country</label>
                      <select
                        name="country"
                        onChange={handleShippingChange}
                        className="py-1 border"
                        required
                        value={order.shipping.country}
                      >
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Australia">Australia</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="address">Address</label>
                    <textarea
                      name="address"
                      id="adress"
                      className="border"
                      placeholder="Home Address"
                      onChange={handleShippingChange}
                      required
                      value={order.shipping.address}
                    />
                  </div>

                  <div className="mt-1.5">
                    <h5 className="max-md:mb-3  text-2xl">Payment Method</h5>
                    <div className="flex   items-center gap-1">
                      <div className="flex gap-2  max-md:flex-1">
                        <input
                          type="radio"
                          name="cod"
                          id="radio"
                          className="cursor-pointer "
                          value="cod"
                          checked={order.paymentMethod === 'cod'}
                          onChange={handlePaymentMethodChange}
                          required
                        />

                        <label className="text-sm mt-px">
                          Cash On Delivery
                        </label>
                      </div>
                      <div className="flex gap-2 max-md:flex-1">
                        <input
                          type="radio"
                          name="paypal"
                          id=""
                          className="cursor-pointer"
                          value="paypal"
                          checked={order.paymentMethod === 'paypal'}
                          onChange={handlePaymentMethodChange}
                          required
                        />
                        <label className="text-sm mt-px">Paypal</label>
                      </div>
                      <div className=" flex gap-2 max-md:flex-1">
                        <input
                          type="radio"
                          name="card"
                          id=""
                          className="cursor-pointer"
                          value="card"
                          checked={order.paymentMethod === 'card'}
                          onChange={handlePaymentMethodChange}
                          required
                        />
                        <label className="text-sm mt-px">Credit Card</label>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            {order.paymentMethod === 'card' && (
              <div className="w-full h-fit flex flex-col justify-start  shadow-md rounded-md bg-[#F7F7F7]">
                {/* Payment Form */}
                <form action="" className="flex flex-col gap-3.5  p-10 ">
                  <h3 className="text-2xl">Payment Details</h3>
                  <div className="grid grid-cols-1 grid-rows-1 gap-3.5">
                    <div className="flex flex-col gap-3.5">
                      <div className="flex flex-col flex-1">
                        <label htmlFor="fname" className="uppercase">
                          Name On card
                        </label>
                        <input
                          name="cardName"
                          className="border"
                          autoComplete="cc-name"
                          placeholder="John Doe"
                          onChange={handleBillingChange}
                          value={order.billing.cardName}
                        />
                      </div>
                      <div className="flex flex-col flex-1">
                        <label htmlFor="cardNumber" className="uppercase">
                          Card Number
                        </label>
                        <input
                          name="cardNumber"
                          className="border"
                          type="text"
                          inputMode="numeric"
                          autoComplete="cc-number"
                          placeholder="1234 5678 9012 3456"
                          onChange={handleBillingChange}
                          required
                          value={order.billing.cardNumber}
                        />
                      </div>
                    </div>
                    {/* Exxpiry */}
                    <div className="flex max-md:grid max-md:grid-cols-2 gap-3.5 max-md:max-w-full">
                      <div className="flex flex-col flex-1  ">
                        <label className="uppercase">Expiry</label>
                        <input
                          name="cardExpiry"
                          type="text"
                          inputMode="numeric"
                          autoComplete="cc-exp"
                          placeholder="MM/YY"
                          className="border "
                          onChange={handleBillingChange}
                          required
                          value={order.billing.cardExpiry}
                        />
                      </div>
                      <div className="flex flex-col flex-1">
                        <label className="uppercase">CVV</label>
                        <input
                          name="cardCVV"
                          type="password"
                          maxLength={4}
                          pattern="\d{4}"
                          inputMode="numeric"
                          autoComplete="cc-csc"
                          placeholder="123"
                          className="border"
                          onChange={handleBillingChange}
                          required
                          value={order.billing.cardCVV ?? ''}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2.5">
                      <div className="flex items-center gap-1.5 w-full">
                        <input
                          type="checkbox"
                          checked={order.billing.useShipping}
                          onChange={(e) =>
                            setOrder((prev) => ({
                              ...prev,
                              billing: {
                                ...prev.billing,
                                useShipping: e.target.checked,
                              },
                            }))
                          }
                        />
                        <label className="text-sm mt-1">
                          Use Shipping Address
                        </label>
                      </div>
                      {!order.billing.useShipping && (
                        <div className="flex flex-col gap-3.5">
                          <div className="flex max-md:grid max-md:grid-cols-2 items-center gap-3.5 w-full ">
                            <div className="flex flex-col flex-1">
                              <label htmlFor="">Select Country</label>
                              <select
                                onChange={handleBillingShippingChange}
                                className="py-1 border"
                                name="country"
                                required
                                value={order.billingShipping.country}
                              >
                                <option value="United States">
                                  United States
                                </option>
                                <option value="Canada">Canada</option>
                                <option value="United Kingdom">
                                  United Kingdom
                                </option>
                                <option value="Australia">Australia</option>
                              </select>
                            </div>
                            <div className="flex flex-col flex-1">
                              <label>Phone Number</label>
                              <input
                                name="phoneNumber"
                                onChange={handleBillingShippingChange}
                                type="text"
                                className="border"
                                required
                                value={order.billingShipping.phoneNumber}
                              />
                            </div>
                          </div>

                          <div className="flex flex-col">
                            <label htmlFor="adress">Adress</label>
                            <textarea
                              name="address"
                              id="adress"
                              className="border"
                              placeholder="Home Adress"
                              required
                              onChange={handleBillingShippingChange}
                              value={order.billingShipping.address}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>
          {/* Coupon */}
          <aside className="flex border flex-col gap-3.5 h-[90%] bg-[#F7F7F7] w-[35%] max-md:w-full rounded-md  p-8">
            <div className="bg-white p-3.5 rounded-md shadow-md">
              <h4>Coupon</h4>
              <form action="" className="flex rounded-sm border-black/50 ">
                <input
                  type="text"
                  className="flex-1 max-w-fit indent-1.5 focus:outline-0  shadow"
                  placeholder="Coupon"
                />
                <button className="bg-black text-white py-1  flex-1 text-sm">
                  Apply Coupon
                </button>
              </form>
            </div>
            {products.map((item, index) => {
              return (
                <div
                  key={index}
                  className="bg-white p-3.5 rounded-md mt-2.5 shadow-md"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-[20%] flex items-center gap-1 ">
                      <Image
                        src="/assets/chair2.png"
                        width={40}
                        height={40}
                        alt="chair"
                      />
                      <span>X{item.quantity}</span>
                    </div>
                    <div className="flex justify-between w-[90%]">
                      <div className="flex mx-1.5">
                        <h4>{item.product}</h4>
                      </div>
                      <span className="font-bold">${item.price}</span>
                    </div>
                  </div>
                </div>
              );
            })}
            <button
              onClick={handleSubmitOrder}
              disabled={!isFormValid}
              className={` size-full py-1 ${
                isFormValid
                  ? 'bg-(--secondryColor)'
                  : 'bg-[#e5861164] cursor-not-allowed! '
              }`}
            >
              Proceed To Payment
            </button>
          </aside>
        </div>
      )}
    </>
  );
};

export default Checkout;
