import React, { useState } from 'react';

const Card = ({ company }) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div className="max-w-md mx-auto bg-primary-content text-secondary rounded-xl shadow-md overflow-hidden m-4">
            <div className="p-6">
                <h1 className="text-2xl font-bold  mb-4">{company.name}</h1>
                <div className="space-y-2">
                    <p><span className="font-semibold">Founded:</span> {company.founded}</p>
                    <p><span className="font-semibold">Founders:</span> {company.founders.join(', ')}</p>
                    <p><span className="font-semibold">CEO:</span> {company.ceo}</p>
                    <p><span className="font-semibold">Headquarters:</span> {company.headquarters}</p>
                    <p><span className="font-semibold">Products:</span> {company.products.join(', ')}</p>
                    <p><span className="font-semibold">Employees:</span> {company.employees.toLocaleString()}</p>
                    <p><span className="font-semibold">Market Cap:</span> {company.market_cap}</p>
                    <p>
                        <span className="font-semibold">Website:</span>{' '}
                        <a 
                            href={company.website} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="hover:underline"
                        >
                            {company.website}
                        </a>
                    </p>
                </div>

                <button onClick={()=>setIsOpen(true)}>Open</button>
            </div>
<dialog id="my_modal_3" className="modal"  open={isOpen}>
  <div className="modal-box">
    <form method="dialog">
      {/* if there is a button in form, it will close the modal */}
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    <h1 className="text-2xl font-bold  mb-4">{company.name}</h1>
    <p className="py-4">Press ESC key or click on ✕ button to close</p>
  </div>
</dialog>
        </div>
    );
};

export default Card;