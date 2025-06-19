import Image from 'next/image';
import { UpdateInvoice, DeleteInvoice } from '@/app/components/invoices/buttons';
import InvoiceStatus from '@/app/components/invoices/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredInvoices } from '@/app/lib/data';
import { nunitoSans } from '@/app/components/fonts';


export default async function InvoicesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const invoices = await fetchFilteredInvoices(query, currentPage);

  return (
    
    <div className={`${nunitoSans.className}  mt-6 flow-root`}>
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-xl bg-white p-4 shadow">
          <table className="min-w-full text-gray-900">
            <thead>
              <tr className="bg-sky-300 text-gray-900 rounded-t-xl">
                <th className="px-4 py-4 font-bold text-left rounded-tl-xl">Customer</th>
                <th className="px-3 py-4 font-bold text-left">Email</th>
                <th className="px-3 py-4 font-bold text-left">Amount</th>
                <th className="px-3 py-4 font-bold text-left">Date</th>
                <th className="px-3 py-4 font-bold text-left">Status</th>
                <th className="py-4 pl-6 pr-3 rounded-tr-xl"></th>
              </tr>
            </thead>
            <tbody>
              {invoices?.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="border-b last:border-b-0 hover:bg-sky-50 transition"
                >
                  <td className="px-4 py-4 flex items-center gap-2 font-medium">

                    <Image
                      src={invoice.image_url}
                      className="rounded-full"
                      width={28}
                      height={28}
                      alt={`${invoice.name}'s profile picture`}
                    />
                    <span>{invoice.name}</span>
                  </td>
                  <td className="px-3 py-4">{invoice.email}</td>
                  <td className="px-3 py-4">{formatCurrency(invoice.amount)}</td>
                  <td className="px-3 py-4">{formatDateToLocal(invoice.date)}</td>
                  <td className="px-3 py-4">
                    <span
                      className={
                        "px-4 py-2 rounded-full font-semibold text-white text-center " +
                        (invoice.status === "pending"
                          ? "bg-amber-600"
                          : invoice.status === "paid"
                            ? "bg-green-500"
                            : invoice.status === "deactivated"
                              ? "bg-red-500"
                              : "bg-gray-400")
                      }
                    >
                      {invoice.status}
                    </span>
                  </td>
                  <td className="py-4 pl-6 pr-3">
                    <div className="flex justify-end gap-2">
                      <UpdateInvoice id={invoice.id} />
                      <DeleteInvoice id={invoice.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}