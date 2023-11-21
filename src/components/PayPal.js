import React, { useRef, useEffect } from "react";

export default function Paypal({ value }) {
    const paypal = useRef();
    console.log('value', value)
    useEffect(() => {
        window.paypal
            .Buttons({
                createOrder: (data, actions, err) => {
                    return actions.order.create({
                        intent: "CAPTURE",
                        purchase_units: [
                            {
                                "amount": {
                                    "currency_code": "USD",
                                    "value": "100.00"
                                },
                                "reference_id": "d9f80740-38f0-11e8-b467-0ed5f89f718b"
                            }
                        ],
                    });
                },
                onApprove: async (data, actions) => {
                    const order = await actions.order.capture();
                    console.log(order);
                },
                onError: (err) => {
                    console.log(err);
                },
            })
            .render(paypal.current);
    }, []);

    return (
        <div>
            <div ref={paypal}></div>
        </div>
    );
}