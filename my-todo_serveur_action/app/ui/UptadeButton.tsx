import { PencilSquareIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";

export default function UptadeButton({ id }: { id: string }) {
  return (
    <Link className="btn btn-update" href={`/todos/${id}/edit`}>
      <PencilSquareIcon style={{ width: "20px" }} />
    </Link>
  );
}
