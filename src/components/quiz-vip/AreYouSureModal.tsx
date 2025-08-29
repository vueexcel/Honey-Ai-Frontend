import React from 'react';
import { Modal } from '@mui/material';

interface AreYouSureModalProps {
  open: boolean;
  onClose: () => void;
  onLoseChance: () => void;
}

const AreYouSureModal: React.FC<AreYouSureModalProps> = ({ open, onClose, onLoseChance }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      className="flex items-center justify-center"
    >
      <div className="bg-white rounded-2xl max-w-xl w-full mx-4 overflow-hidden">
        <div className="relative">
          <div className="bg-gradient-to-r from-purple-600 to-pink-500">
            <div className="px-6 py-3 bg-purple-100/10">
              <span className="inline-block px-4 py-1 rounded-full bg-purple-300/30 text-white text-sm">
                Only for NEW users
              </span>
            </div>
            <img
              src="/assets/images/girl2.webp"
              alt="Special Offer"
              className="w-full h-48 object-cover"
            />
            <div className="px-6 py-3 flex items-center justify-between text-white">
              <span className="text-xl font-semibold">One-Time Offer</span>
              <div className="flex items-center gap-2">
                <span className="text-2xl">⌛</span>
                <span className="text-xl">52 Sec</span>
              </div>
            </div>
          </div>

          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Are You Sure?</h2>
            <p className="text-gray-600 mb-6">
              By going away, you'll lose the opportunity to receive all listed{' '}
              <span className="font-semibold">features for free!</span>
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center">
                <span>Get 100 tokens every month</span>
                <div className="flex items-center gap-2">
                  <span className="line-through text-red-500">$179.88</span>
                  <span className="text-green-500">$0.00</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span>Access to any chat</span>
                <div className="flex items-center gap-2">
                  <span className="line-through text-red-500">$39.99</span>
                  <span className="text-green-500">$0.00</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span>Generate 20 photos</span>
                <div className="flex items-center gap-2">
                  <span className="line-through text-red-500">$14.99</span>
                  <span className="text-green-500">$0.00</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span>Create your own AI Characters</span>
                <div className="flex items-center gap-2">
                  <span className="line-through text-red-500">$4.00</span>
                  <span className="text-green-500">$0.00</span>
                </div>
              </div>
            </div>

            <p className="text-gray-500 text-sm text-center mb-6">
              This offer is available only now, on this screen.
            </p>

            <div className="flex flex-col gap-3">
              <button
                onClick={onLoseChance}
                className="w-full py-3 text-gray-500 hover:text-gray-700 transition-colors"
              >
                Lose my chance
              </button>
              <button
                onClick={onClose}
                className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full hover:opacity-90 transition-opacity"
              >
                Go back
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AreYouSureModal;
