// Form and functionality for updating a team member
import { BaseSyntheticEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { createPayment, getPayments } from "../api/payments";

const TMPay = ({ setShowModal, memberData, setPayments }: any) => {
  // Estimated weekly pay
  const basePay: number = Number((memberData.pay / 52).toFixed(2));

  // State
  const [payMods, setPayMods] = useState([]); // Pay modifications
  const [adjPay, setAdjPay] = useState(basePay); // "Adjusted pay" (total pay including all adjustments)

  // Submit payment
  const paySubmit = async (v: any, e: BaseSyntheticEvent | undefined) => {
    e?.preventDefault();

    // Format
    const newPayment = {
      teamMemberId: memberData._id,
      payAmount: adjPay,
      originalAmount: v.originalAmount,
      modifications: [...payMods],
    };
    try {
      // Create the payment
      await createPayment(newPayment);
      // Close modal & refetch payments
      setShowModal(false);
      const payments = await getPayments(memberData._id);
      setPayments(payments.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Submit pay modification / adjustment
  const modSubmit = (v: any, e: BaseSyntheticEvent | undefined) => {
    e?.preventDefault();

    // Add to state
    //@ts-ignore
    setPayMods([...payMods, { ...v, modificationType: "number" }]);

    // Reset form values
    modForm.reset();
  };

  // Input validation for "Base pay" input
  let baseSchema = yup.object().shape({
    originalAmount: yup
      .number()
      .required("payAmount is required.")
      .min(0, "payAmount must be at least 0.")
      .max(1000000000, "payAmount can't exceed 1000000000."),
  });

  const baseForm = useForm({
    resolver: yupResolver(baseSchema),
  });

  // Input validation for pay adjustment inputs
  let modSchema = yup.object().shape({
    reason: yup
      .string()
      .required("A reason is required.")
      .min(1, "Reason must be at least 1 character long.")
      .max(100, "Reason can't exceed 100 characters."),
    value: yup
      .number()
      .required("Value is required.")
      .min(-1000000000, "Value must be at least -1000000000.")
      .max(1000000000, "V can't exceed 1000000000."),
  });

  const modForm = useForm({
    resolver: yupResolver(modSchema),
  });

  // Update "adjPay" when either "payMods" or the base pay input changes
  useEffect(() => {
    // Add all pay modification values
    let totalPay: number = Number(baseForm.getValues("originalAmount"));
    //@ts-ignore
    for (let m of payMods) totalPay += m.value;

    // Update "adjPay" state
    setAdjPay(Number(totalPay.toFixed(2)));
  }, [payMods, baseForm.watch("originalAmount")]);

  // JSX
  return (
    <div className="editWrap">
      <h3>Pay {memberData.name}</h3>

      <form
        onSubmit={baseForm.handleSubmit((values, event) =>
          paySubmit(values, event)
        )}
      >
        <input
          type="number"
          placeholder="Base pay"
          defaultValue={basePay} // Assumes "memberData.pay" is annual salary & payments are weekly.
          step="0.01"
          {...baseForm.register("originalAmount", { required: true })}
        />
        {/* Name input error messages */}
        {baseForm.formState.errors?.originalAmount?.message ? (
          <span className="error">{`${baseForm.formState.errors?.originalAmount?.message}`}</span>
        ) : (
          <></>
        )}

        <span className="totalPay">Total pay: ${adjPay}</span>
        <button className="actionBtns">Submit</button>
      </form>

      <form
        className="modForm"
        onSubmit={modForm.handleSubmit((values, event) =>
          modSubmit(values, event)
        )}
      >
        <h3>Adjust pay (optional)</h3>
        <input
          type="text"
          placeholder="Reason for adjustment"
          {...modForm.register("reason", { required: true })}
        />
        {/* Current position input error messages */}
        {modForm.formState.errors?.reason?.message ? (
          <span className="error">{`${modForm.formState.errors?.reason?.message}`}</span>
        ) : (
          <></>
        )}
        <input
          type="number"
          placeholder="Pay adjustment"
          step="0.01"
          {...modForm.register("value", { required: true })}
        />
        {/* Pay input error messages */}
        {modForm.formState.errors?.value?.message ? (
          <span className="error">{`${modForm.formState.errors?.value?.message}`}</span>
        ) : (
          <></>
        )}
        <button className="actionBtns">Adjust</button>
      </form>

      <div className="modsWrap">
        <span>Applied adjustments ({payMods.length})</span>
        <div className="modScroll">
          {payMods.map((e: any, i: number) => (
            <span
              className="payments"
              key={"payment" + i}
            >{`${e.reason}: $${e.value}`}</span>
          ))}
        </div>
      </div>

      <style>{`
      .editWrap {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

        form {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        
        input {
            margin-bottom: 15px;
            border: 1px solid rgba(0, 0, 0, 0.3);
            padding: 8px;
            font-size: 18px;
            
            width: 250px;
        }
        
        .error {
            color: red;
        }

        .totalPay {
          margin-bottom: 10px;
        }

        .modForm {
          margin-top: 15px;
        }
        .modsWrap {
          margin-top: 15px;
        }

        .modScroll {
          height: 50px;
          overflow-y:auto;
    
          display: flex;
          flex-direction: column;
        }
        `}</style>
    </div>
  );
};

export default TMPay;
