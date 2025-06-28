'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/ui/avatar';
import { Calendar, MapPin, Users, DollarSign, MoreVertical } from 'lucide-react';

const guestsData = [
  { id: 1, name: 'guest-email@example.com', status: 'Confirmed' },
  { id: 2, name: 'André Azevedo', email: 'sunnyday123@example.com', status: 'Pending' },
  { id: 3, name: 'oceanbreeze456@example.com', status: 'Confirmed' },
  { id: 4, name: 'mountainview789@example.com', status: 'Declined' },
  { id: 5, name: 'John Smith', email: 'citylights101@example.com', status: 'Confirmed' },
  // ...more rows
];

const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    Pending: 'bg-[#E6F0FF] text-[#3366FF]',
    Confirmed: 'bg-[#D9F7BE] text-[#389E0D]',
    Declined: 'bg-[#FFF2E8] text-[#D46B08]',
  };
  return (
    <span className={`inline-flex items-center text-[14px] font-medium rounded px-[8px] py-[4px] ${styles[status]}`}>
      {status}
    </span>
  );
};

export default function EventPage() {
  return (
    <div className="max-w-[1440px] mx-auto bg-white">
      {/* Topbar */}
      <header className="h-[64px] flex items-center justify-between px-[32px] border-b border-[#DEE3EC]">
        <div className="flex items-center space-x-[32px]">
          {/* EMU Logo */}
          <img src="/emu-logo.svg" alt="Emu" className="w-[76px] h-[21px]" />
          {/* Nav Items */}
          <nav className="flex items-center space-x-[32px]">
            {/* Events Tab */}
            <div className="relative flex items-center space-x-[8px] px-[16px] py-[8px]">
              <Calendar className="w-[16px] h-[16px] text-[#001F54]" />
              <span className="text-[16px] font-medium text-[#001F54]">Events</span>
              <span className="ml-auto bg-[#FCEBEA] text-[#ED3670] text-[14px] font-semibold leading-[20px] px-[6px] py-[2px] rounded-full">48</span>
              {/* Active underline */}
              <div className="absolute bottom-0 left-0 w-full h-[4px] bg-[#ED3670]" />
            </div>
            {/* Items Tab */}
            <div className="relative flex items-center space-x-[8px] px-[16px] py-[8px]">
              <Users className="w-[16px] h-[16px] text-[#616F94]" />
              <span className="text-[16px] font-medium text-[#616F94]">Items</span>
              <span className="ml-auto bg-[#F2F4F7] text-[#616F94] text-[14px] font-semibold leading-[20px] px-[6px] py-[2px] rounded-full">48</span>
            </div>
            {/* Reports Tab */}
            <div className="relative flex items-center space-x-[8px] px-[16px] py-[8px]">
              <DollarSign className="w-[16px] h-[16px] text-[#616F94]" />
              <span className="text-[16px] font-medium text-[#616F94]">Reports</span>
              <span className="ml-auto bg-[#F2F4F7] text-[#616F94] text-[14px] font-semibold leading-[20px] px-[6px] py-[2px] rounded-full">12</span>
            </div>
          </nav>
        </div>
        {/* Topbar Actions */}
        <div className="flex items-center space-x-[24px]">
          <Button variant="ghost" className="w-[32px] h-[32px] p-0"><Calendar className="w-[20px] h-[20px]" /></Button>
          <Button variant="ghost" className="w-[32px] h-[32px] p-0"><Users className="w-[20px] h-[20px]" /></Button>
          <Button variant="ghost" className="w-[32px] h-[32px] p-0"><MapPin className="w-[20px] h-[20px]" /></Button>
          <Avatar src="/avatar.png" alt="User Avatar" className="w-[32px] h-[32px]" />
        </div>
      </header>

      {/* Event Details */}
      <section className="px-[32px] pt-[24px]">
        <h1 className="text-[32px] font-semibold">Caio’s birthday</h1>
        <p className="mt-[16px] text-[16px] text-[#616F94] leading-[24px] max-w-[800px]">
          Caio’s birthday is a formal event featuring a traditional marriage ceremony followed by a grand reception. The celebration will include elegant decor, a sit-down dinner, live music, and various entertainment activities, designed to create a memorable and joyous experience for all guests.
        </p>
        <div className="mt-[24px] flex flex-wrap gap-[24px] text-[14px] text-[#616F94]">
          <div className="flex items-center space-x-[8px]"><Calendar className="w-[16px] h-[16px]"/><span>July 16th (In 4 weeks)</span></div>
          <div className="flex items-center space-x-[8px]"><MapPin className="w-[16px] h-[16px]"/><span>47 W 13th St, New York, NY 10011, USA</span></div>
          <div className="flex items-center space-x-[8px]"><Users className="w-[16px] h-[16px]"/><span>134 guests invited</span></div>
          <div className="flex items-center space-x-[8px]"><DollarSign className="w-[16px] h_[16px]"/><span>U$ 1,000.00</span></div>
        </div>
        <div className="mt-[24px] space-x-[8px]">
          <Button variant="outline" className="h-[40px] px-[16px]">Edit event</Button>
          <Button className="h-[40px] px-[16px] bg-[#ED3670] text-white">Create new event</Button>
        </div>
      </section>

      {/* Guests Section */}
      <section className="px-[32px] pt-[32px]">
        {/* Tabs + Search */}
        <div className="flex items-center justify-between">
          <div className="flex space-x-[16px] text-[14px]">
            <button className="flex items-center space-x-[4px] text-[#001F54] font-medium">Pending <span className="text-[#616F94]">(70)</span></button>
            <button className="flex items-center space-x-[4px] text-[#616F94]">Declined <span className="text-[#616F94]">(16)</span></button>
            <button className="flex items-center space-x-[4px] text-[#616F94]">Confirmed <span className="text-[#616F94]">(31)</span></button>
          </div>
          <div className="flex items-center space-x-[16px]">
            <Input placeholder="Search Guests" className="w-[240px] h-[40px] px-[12px]" />
            <Button className="h-[40px] px-[16px] bg-[#ED3670] text-white">Invite Guest</Button>
          </div>
        </div>
        {/* Guests Table */}
        <div className="mt-[24px] overflow-x-auto">
          <table className="min-w-full border border-[#DEE3EC] rounded-lg overflow-hidden text-[14px]">
            <thead className="bg-[#F9FAFB]">
              <tr>
                <th className="px-[16px] py-[12px] font-semibold text-left text-[#616F94]">Name</th>
                <th className="px-[16px] py-[12px] font-semibold text-left text-[#616F94]">Email</th>
                <th className="px-[16px] py-[12px] font-semibold text-left text-[#616F94]">Status</th>
                <th className="px-[16px] py-[12px] font-semibold text-left text-[#616F94]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {guestsData.map((guest) => (
                <tr key={guest.id} className="border-t border-[#DEE3EC]">
                  <td className="px-[16px] py-[12px] font-medium text-[#001F54]">
                    {guest.name}
                  </td>
                  <td className="px-[16px] py-[12px] text-[#616F94]">
                    {guest.email || '-'}
                  </td>
                  <td className="px-[16px] py-[12px]">
                    <StatusBadge status={guest.status} />
                  </td>
                  <td className="px-[16px] py-[12px]">
                    <Button variant="ghost" size="icon"><MoreVertical className="w-4 h-4" /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
