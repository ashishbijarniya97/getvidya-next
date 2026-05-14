import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Delete Your Account – GetVidya",
  description: "Request deletion of your GetVidya account and all associated data.",
  robots: { index: false, follow: false },
};

export default function AccountDeletePage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-16">
      <div className="max-w-xl w-full">
        <div className="mb-8 text-center">
          <span className="text-2xl font-bold text-black">GetVidya</span>
          <span className="ml-1 text-xs bg-black text-white rounded px-1.5 py-0.5 align-middle">AI</span>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-3">Delete Your Account</h1>
        <p className="text-gray-500 mb-8 text-sm leading-relaxed">
          You can permanently delete your GetVidya account and all associated data at any time.
          Once deleted, your account cannot be recovered.
        </p>

        <div className="border border-gray-200 rounded-xl p-6 mb-4">
          <h2 className="font-semibold text-gray-900 mb-1">Option 1 — Delete from the app</h2>
          <p className="text-sm text-gray-500 mb-3">The quickest way to delete your account:</p>
          <ol className="text-sm text-gray-600 space-y-1.5 list-decimal list-inside">
            <li>Open the <strong>GetVidya</strong> app on your device</li>
            <li>Go to <strong>Profile → Settings</strong></li>
            <li>Tap <strong>Delete Account</strong></li>
            <li>Confirm deletion — your account and data will be removed within 30 days</li>
          </ol>
        </div>

        <div className="border border-gray-200 rounded-xl p-6 mb-8">
          <h2 className="font-semibold text-gray-900 mb-1">Option 2 — Request via email</h2>
          <p className="text-sm text-gray-500 mb-3">
            If you no longer have access to the app, email us from the address linked to your account:
          </p>
          <a
            href="mailto:support@getvidya.in?subject=Account%20Deletion%20Request"
            className="inline-flex items-center gap-2 bg-black text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Email support@getvidya.in
          </a>
          <p className="text-xs text-gray-400 mt-3">
            Include your registered phone number or user ID in the email. We will process your request within 7 business days.
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl p-5 mb-8">
          <h2 className="font-semibold text-gray-800 mb-3 text-sm">What gets deleted</h2>
          <ul className="text-sm text-gray-600 space-y-1.5">
            <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">✕</span> Your profile and personal information</li>
            <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">✕</span> All test attempts and performance history</li>
            <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">✕</span> Streaks, XP, and study plans</li>
            <li className="flex items-start gap-2"><span className="text-red-400 mt-0.5">✕</span> Saved practice sessions and bookmarks</li>
            <li className="flex items-start gap-2"><span className="text-orange-400 mt-0.5">!</span> Active subscriptions must be cancelled separately through Google Play before deletion</li>
          </ul>
        </div>

        <p className="text-xs text-gray-400 text-center">
          For any questions, contact us at{" "}
          <a href="mailto:support@getvidya.in" className="underline">support@getvidya.in</a>
        </p>
      </div>
    </div>
  );
}
