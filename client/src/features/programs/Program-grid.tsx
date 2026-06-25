import { useState } from "react";
import {
  useCreateProgram,
  useDeleteProgram,
  useUpdateProgram,
} from "./program-mutations";

import { CiShoppingCart } from "react-icons/ci";

const ProgramGrid = ({ data }: any) => {
  const createMutation = useCreateProgram();
  const deleteMutation = useDeleteProgram();
  const updateMutation = useUpdateProgram();

  const [updateQuantity, setUpdateQuantity] = useState<boolean>(true);
  const [quantity, setQuantity] = useState<number>(4);

  const formData = {
    name: "MRI",
    type: "SCAN",
    description: "This surgery for the heart and it's related organs",
    image:
      "https://plus.unsplash.com/premium_photo-1661627133045-6fcffcefaa8c?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHN1cmdlcnl8ZW58MHx8MHx8fDA%3D",
    durationMinutes: 15,
    unitCost: 63022.87,
  };

  const updateData = {
    // name: "MRI",
    // type: "SCAN",
    description: "This is the updated description for MRI scan",
    durationMinutes: 25,
    unitCost: 63000.99,
  };

  const handleAdd = async () => {
    createMutation.mutate(formData, {
      onSuccess: () => {
        console.log("Program created!");
      },
    });
  };
  const handleDelete = async (id: string) => {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        console.log("Program deleted!");
      },
    });
  };
  const handleUpdate = async ({
    id,
    payload,
  }: {
    id: string;
    payload: any;
  }) => {
    updateMutation.mutate(
      { id, payload },
      {
        onSuccess: () => {
          console.log("Program updated!");
        },
      },
    );
  };

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity((prev) => prev - 1);
  };

  return (
    <div>
      <button className="btn btn-primary" onClick={handleAdd}>
        Add Program
      </button>
      <button
        className="btn btn-primary"
        onClick={() => handleDelete("432aae60-1258-4b77-8a8d-ee537e450765")}
      >
        Delete Program
      </button>
      <button
        className="btn btn-primary"
        onClick={() =>
          handleUpdate({
            id: "aeb20483-336c-4962-be27-52a76e97304c",
            payload: updateData,
          })
        }
      >
        Update Program
      </button>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mr-2">
        {data.items.map((item: any) => (
          <div className="card bg-base-100 image-full w-72 shadow-sm">
            <figure>
              <img src={item.image} alt={item.name} />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{item.name}</h2>
              <p>{item.description}</p>
              <div className="card-actions justify-end">
                {updateQuantity && (
                  <div className="flex">
                    <button
                      className="btn btn-secondary"
                      onClick={handleDecrement}
                    >
                      -
                    </button>
                    <div>{quantity}</div>
                    <button
                      className="btn btn-secondary"
                      onClick={handleIncrement}
                    >
                      +
                    </button>
                  </div>
                )}
                {!updateQuantity && (
                  <button className="btn btn-secondary">
                    Add to Cart <CiShoppingCart />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgramGrid;
