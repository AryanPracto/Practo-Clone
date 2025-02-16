const Stripe = require("stripe");
const User = require("../models/user.model.js");
const Appointment = require("../models/appointment.model.js");
const Slot = require("../models/slot.model.js");

const stripe = new Stripe("sk_test_51QpnOgGdXFymKfnwWe70BRDuKquttNfRVMTQLEXJVXDQnkthxszeuhWV7Fq8Dn1d4Gkqn37etPDQ0hAmDUVZ8C3g00NayZ0WZy");

async function handleCheckout(req, res) {
    try {
        const { userId, slotId, doctorId, clinicId, fee } = req.body.data;

        // **Validate Slot**
        const slot = await Slot.findOne({ where: { id: slotId, status: "available" } });
        if (!slot) {
            return res.status(400).json({ message: "Selected slot is not available." });
        }

        // **Create Stripe Checkout Session**
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "inr",
                        product_data: { name: "Doctor Appointment" },
                        unit_amount: fee * 100, // Convert to paise
                    },
                    quantity: 1,
                }
            ],
            mode: "payment",
            success_url: "http://localhost:5173/success",
            cancel_url: "http://localhost:5173/cancel"
        });

        // **Create Appointment in Database**
        const appointment = await Appointment.create({
            userId: userId,
            slotId,
            doctorId,
            clinicId,
            fee,
            status: "Scheduled",
        });

        // **Update Slot Status**
        await slot.update({ status: "booked" });

        return res.json({ url: session.url, appointmentId: appointment.id });

    } catch (error) {
        console.error("Error in checkout:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = { handleCheckout };
