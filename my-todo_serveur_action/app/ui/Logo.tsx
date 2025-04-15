import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function Logo() {
  return (
    <div className="logo-container">
        <Link className="logo" href='/'>
            <ClipboardDocumentListIcon style={{ width: '60px'}} /> MyTodo
        </Link>
    </div>
  )
}
