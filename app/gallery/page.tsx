"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Code, Play, Terminal, Sparkles, Check, Copy, ExternalLink, Cpu, Info } from "lucide-react";
import { Logo } from "@/components/logo";

// Mock Projects Data
const GALLERY_PROJECTS = [
  {
    id: "solana-nft",
    name: "Solana NFT Marketplace",
    description: "A fast, neon-themed NFT minting dashboard featuring real-time transaction simulation logs.",
    chain: "Solana",
    model: "Gemini 1.5 Pro",
    prompt: `Create a modern NFT minting page on Solana with real-time total minted count, price display, wallet connection state, mint quantity selector, and transaction logs window showing simulation results.`,
    code: `import { useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';

export default function MintPage() {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [mintCount, setMintCount] = useState(384);
  const [quantity, setQuantity] = useState(1);
  const [status, setStatus] = useState('');

  const handleMint = async () => {
    if (!publicKey) return alert("Connect Wallet First!");
    try {
      setStatus('Simulating transaction...');
      // Simulated mint transaction structure
      const mintTx = await createMintTransaction(publicKey, quantity);
      const signature = await sendTransaction(mintTx, connection);
      setStatus(\`Minted successfully! Sig: \${signature.slice(0, 8)}...\`);
      setMintCount(prev => prev + quantity);
    } catch (e) {
      setStatus(\`Error: \${e.message}\`);
    }
  };

  return (
    <div className="bg-black text-white p-8 border border-purple-500/30 rounded-xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold tracking-wider text-purple-400">NEON APE CLUB</h2>
        <span className="bg-purple-900/50 border border-purple-500/50 px-3 py-1 text-xs">SOLANA</span>
      </div>
      {/* Mint UI Controls */}
    </div>
  );
}`,
    previewComponent: function SolanaNFTPreview() {
      const [quantity, setQuantity] = useState(1);
      const [minted, setMinted] = useState(1420);
      const [logs, setLogs] = useState<string[]>(["[System] Ready to mint."]);
      const [isMinting, setIsMinting] = useState(false);

      const handleMint = () => {
        if (isMinting) return;
        setIsMinting(true);
        setLogs(prev => [...prev, `[Info] Requesting mint of ${quantity} Neon NFT(s)...`]);
        
        setTimeout(() => {
          setLogs(prev => [...prev, `[RPC] Simulating Solana Instruction...`]);
          setTimeout(() => {
            setLogs(prev => [
              ...prev, 
              `[Success] Signature confirmed: 4zP9...3v7G`, 
              `[System] Minted Neon NFT #${minted + 1} - #${minted + quantity}`
            ]);
            setMinted(prev => prev + quantity);
            setIsMinting(false);
          }, 800);
        }, 600);
      };

      return (
        <div className="flex flex-col md:flex-row gap-6 p-6 bg-zinc-950 border border-purple-500/30 rounded-xl text-white font-mono">
          {/* Card left */}
          <div className="flex-1 flex flex-col justify-between min-h-[300px]">
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-purple-400 text-xs font-bold uppercase tracking-widest">Live Mint</span>
                <span className="text-zinc-500 text-xs">{minted} / 3333 Minted</span>
              </div>
              
              {/* Fake NFT artwork */}
              <div className="h-40 w-full rounded-lg bg-gradient-to-br from-purple-900 to-indigo-950 border border-purple-500/20 flex flex-col items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                <div className="absolute w-24 h-24 rounded-full bg-purple-500/10 blur-xl animate-pulse"></div>
                <span className="text-4xl">🔮</span>
                <span className="text-sm text-purple-300 font-bold mt-2">Neon Relic #{minted + 1}</span>
                <span className="text-[10px] text-zinc-400">Price: 0.25 SOL</span>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between mb-3 bg-zinc-900 p-2 rounded border border-zinc-800">
                <span className="text-xs text-zinc-400">Quantity</span>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="w-6 h-6 flex-center bg-zinc-800 hover:bg-zinc-700 active:scale-95 text-xs rounded border border-zinc-700"
                  >
                    -
                  </button>
                  <span className="text-sm font-bold w-4 text-center">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(q => Math.min(5, q + 1))}
                    className="w-6 h-6 flex-center bg-zinc-800 hover:bg-zinc-700 active:scale-95 text-xs rounded border border-zinc-700"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleMint}
                disabled={isMinting}
                className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-2.5 px-4 text-sm transition-all duration-200 cursor-pointer border-t border-purple-400 flex items-center justify-center gap-2"
                style={{ clipPath: "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)" }}
              >
                {isMinting ? "MINTING..." : `MINT FOR ${(quantity * 0.25).toFixed(2)} SOL`}
              </button>
            </div>
          </div>

          {/* Terminal Right */}
          <div className="w-full md:w-[260px] bg-black border border-zinc-800 rounded-lg p-4 flex flex-col text-[11px] font-mono justify-between">
            <div>
              <div className="flex items-center gap-2 text-zinc-500 border-b border-zinc-900 pb-2 mb-2 font-bold uppercase tracking-wider">
                <Terminal size={12} className="text-purple-500" />
                <span>Simulation Terminal</span>
              </div>
              <div className="space-y-1.5 max-h-[180px] overflow-y-auto scrollbar-thin">
                {logs.map((log, idx) => (
                  <div key={idx} className={
                    log.includes("[Success]") ? "text-green-400" :
                    log.includes("[Error]") ? "text-red-400" :
                    log.includes("[RPC]") ? "text-yellow-400" :
                    log.includes("[Info]") ? "text-cyan-400" : "text-zinc-400"
                  }>
                    {log}
                  </div>
                ))}
              </div>
            </div>
            <button 
              onClick={() => setLogs(["[System] Terminal cleared."])} 
              className="text-right text-[10px] text-zinc-600 hover:text-zinc-400 mt-2 font-bold cursor-pointer"
            >
              Clear Output
            </button>
          </div>
        </div>
      );
    }
  },
  {
    id: "celo-defi",
    name: "Celo Yield Dashboard",
    description: "A DeFi vault interaction system with dynamic yield rewards simulation and slippage alerts.",
    chain: "Celo",
    model: "Gemini 1.5 Flash",
    prompt: `Build a Celo yield farming dashboard listing active vaults (cUSD-CELO, CELO-ETH), displaying APY, TVL, and deposit forms with auto-slippage calculation and transaction logs.`,
    code: `import { useState } from 'react';
import { useVaultContract } from '../hooks/useVaultContract';

export default function DeFiDashboard() {
  const { deposit, getVaultStats } = useVaultContract();
  const [amount, setAmount] = useState('');
  const [slippage, setSlippage] = useState(0.5);

  const handleDeposit = async () => {
    if (!amount || parseFloat(amount) <= 0) return;
    await deposit(amount, slippage);
  };

  return (
    <div className="bg-zinc-900 text-white rounded-lg p-6 border border-emerald-500/20">
      <h3 className="text-xl font-bold text-emerald-400 mb-4">CELO-cUSD AutoVault</h3>
      <input 
        type="number" 
        value={amount} 
        onChange={e => setAmount(e.target.value)} 
        placeholder="Deposit Amount" 
        className="w-full bg-black/50 border border-zinc-700 rounded p-2 text-white"
      />
    </div>
  );
}`,
    previewComponent: function CeloDeFiPreview() {
      const [depositAmt, setDepositAmt] = useState("");
      const [status, setStatus] = useState("Idle");
      const [balance, setBalance] = useState(125.0);
      const [vaultTVL, setVaultTVL] = useState(549210);

      const handleDeposit = () => {
        const val = parseFloat(depositAmt);
        if (isNaN(val) || val <= 0 || val > balance) return;
        setStatus("Depositing...");
        
        setTimeout(() => {
          setStatus("Generating ERC20 Approve txn...");
          setTimeout(() => {
            setStatus("Vault.deposit() simulated...");
            setTimeout(() => {
              setBalance(b => b - val);
              setVaultTVL(tvl => tvl + val);
              setStatus(`Success! Deposited $${val.toFixed(2)} cUSD`);
              setDepositAmt("");
            }, 800);
          }, 600);
        }, 500);
      };

      return (
        <div className="p-6 bg-zinc-950 border border-emerald-500/30 rounded-xl text-white font-mono flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold text-emerald-400">cUSD Vault</h3>
              <p className="text-[11px] text-zinc-500">Auto-compound yield vault</p>
            </div>
            <div className="text-right">
              <span className="text-xs bg-emerald-950/50 border border-emerald-500/50 px-2 py-0.5 text-emerald-400 rounded">
                12.4% APY
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 bg-zinc-900/60 p-4 rounded border border-zinc-900">
            <div>
              <div className="text-[10px] text-zinc-500 font-bold uppercase">Vault TVL</div>
              <div className="text-lg font-bold text-zinc-200">${vaultTVL.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-[10px] text-zinc-500 font-bold uppercase">My Wallet Bal</div>
              <div className="text-lg font-bold text-zinc-200">${balance.toFixed(2)} cUSD</div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-[11px] text-zinc-400 mb-1">Deposit Amount (cUSD)</label>
              <div className="relative">
                <input
                  type="number"
                  value={depositAmt}
                  onChange={(e) => setDepositAmt(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-black border border-zinc-800 rounded p-2.5 pr-12 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
                <button 
                  onClick={() => setDepositAmt(balance.toString())}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] bg-zinc-800 hover:bg-zinc-700 px-2 py-0.5 rounded font-bold cursor-pointer"
                >
                  MAX
                </button>
              </div>
            </div>

            <button
              onClick={handleDeposit}
              disabled={!depositAmt || status.includes("ing...")}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-2.5 px-4 text-sm transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
              style={{ clipPath: "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)" }}
            >
              DEPOSIT INTO VAULT
            </button>
          </div>

          <div className="flex items-center gap-3 bg-black/60 p-3 rounded border border-zinc-900 text-xs">
            <span className={`w-2 h-2 rounded-full ${status.includes("Success") ? "bg-green-500" : status.includes("ing") ? "bg-yellow-500" : "bg-zinc-600 animate-pulse"}`}></span>
            <span className="text-zinc-400 font-bold">Status:</span>
            <span className={status.includes("Success") ? "text-green-400" : status.includes("ing") ? "text-yellow-300" : "text-zinc-300"}>
              {status}
            </span>
          </div>
        </div>
      );
    }
  },
  {
    id: "stellar-crowdfund",
    name: "Stellar Launchpad",
    description: "Crowdfunding project campaign manager using Stellar asset ecosystem smart integrations.",
    chain: "Stellar",
    model: "Gemini 1.5 Pro",
    prompt: `Design a Stellar crowdfunding launchpad dApp for community projects. Display total funded progress bar, tiers of donation, custom stellar asset payment portal, and recent transaction stream.`,
    code: `import { Horizon } from 'stellar-sdk';

export async function submitDonation(seed: string, amount: string, memo: string) {
  const server = new Horizon.Server('https://horizon-testnet.stellar.org');
  const sourceKeys = Keypair.fromSecret(seed);

  const transaction = new TransactionBuilder(await server.loadAccount(sourceKeys.publicKey()), {
    fee: Horizon.BASE_FEE,
    networkPassphrase: Networks.TESTNET,
  })
    .addOperation(Operation.payment({
      destination: DESTINATION_ADDRESS,
      asset: Asset.native(),
      amount: amount
    }))
    .addMemo(Memo.text(memo))
    .setTimeout(30)
    .build();

  transaction.sign(sourceKeys);
  return server.submitTransaction(transaction);
}`,
    previewComponent: function StellarPreview() {
      const [pledged, setPledged] = useState(84200);
      const [txs, setTxs] = useState([
        { id: "1", amount: 250, user: "GDQ...R62" },
        { id: "2", amount: 1200, user: "GBS...2H9" }
      ]);

      const handleDonate = (amount: number) => {
        const fakeAddress = "GBR" + Math.random().toString(36).substring(2, 8).toUpperCase() + "...M5T";
        setPledged(prev => prev + amount);
        setTxs(prev => [{ id: Date.now().toString(), amount, user: fakeAddress }, ...prev]);
      };

      const percent = Math.min(100, (pledged / 100000) * 100);

      return (
        <div className="p-6 bg-zinc-950 border border-blue-500/30 rounded-xl text-white font-mono flex flex-col gap-6">
          <div>
            <h3 className="text-lg font-bold text-blue-400">Launchpad: LumenX Energy</h3>
            <p className="text-[11px] text-zinc-500">Eco-conscious infrastructure on Stellar</p>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1 font-bold">
              <span>Progress: {percent.toFixed(1)}%</span>
              <span className="text-blue-400">{pledged.toLocaleString()} / 100,000 XLM</span>
            </div>
            <div className="w-full bg-zinc-900 rounded-full h-3.5 border border-zinc-800 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${percent}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="text-[11px] text-zinc-400 mb-2 font-bold uppercase tracking-wider">Quick Pledge Tiers</div>
            <div className="grid grid-cols-3 gap-3">
              {[100, 500, 2000].map(tier => (
                <button
                  key={tier}
                  onClick={() => handleDonate(tier)}
                  className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-blue-500/50 p-3 text-center rounded transition-all cursor-pointer group active:scale-95"
                >
                  <div className="text-xs text-zinc-400 font-bold group-hover:text-blue-300">+{tier} XLM</div>
                  <div className="text-[9px] text-zinc-600 mt-1 font-mono">Pledge</div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-black/60 p-4 rounded border border-zinc-900">
            <div className="text-[10px] text-zinc-500 font-bold uppercase mb-2">Live Ledger Stream</div>
            <div className="space-y-1.5 max-h-[80px] overflow-y-auto">
              {txs.map(tx => (
                <div key={tx.id} className="text-[11px] flex justify-between">
                  <span className="text-blue-300 font-bold">{tx.user} pledged</span>
                  <span className="text-green-400">+{tx.amount} XLM</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }
  },
  {
    id: "dao-governance",
    name: "DAO Governance Portal",
    description: "Multichain voting mechanism dashboard where DAO proposals are simulated and enacted.",
    chain: "Celo",
    model: "Gemini 1.5 Pro",
    prompt: `Generate a multi-chain DAO governance forum. Include proposal details, voting statistics bar charts (Yes/No/Abstain), dynamic voting panel (for voting with token weight), and smart contract simulation output.`,
    code: `import { Contract } from 'ethers';

export async function voteOnProposal(proposalId: number, support: number) {
  const governorContract = new Contract(GOVERNOR_ADDRESS, GOVERNOR_ABI, signer);
  
  // Submit Vote
  const tx = await governorContract.castVote(proposalId, support);
  const receipt = await tx.wait();
  
  return {
    transactionHash: receipt.transactionHash,
    status: receipt.status === 1 ? 'Success' : 'Failed'
  };
}`,
    previewComponent: function DAOPreview() {
      const [votes, setVotes] = useState({ yes: 14200, no: 3400, abstain: 980 });
      const [myVote, setMyVote] = useState<string | null>(null);

      const castVote = (type: "yes" | "no" | "abstain") => {
        if (myVote) return;
        setMyVote(type);
        setVotes(prev => ({
          ...prev,
          [type]: prev[type] + 500 // simulate 500 token weight voting weight
        }));
      };

      const total = votes.yes + votes.no + votes.abstain;
      const getPercent = (val: number) => ((val / total) * 100).toFixed(1);

      return (
        <div className="p-6 bg-zinc-950 border border-yellow-500/30 rounded-xl text-white font-mono flex flex-col gap-6">
          <div>
            <span className="text-[10px] bg-yellow-950 text-yellow-500 border border-yellow-500/50 px-2 py-0.5 rounded font-bold uppercase">
              Active Proposal
            </span>
            <h3 className="text-base font-bold text-zinc-200 mt-2">EIP-39: Integrate Liquid Staking Modules</h3>
            <p className="text-[11px] text-zinc-500 mt-1">Voting ends in 2 days. 1 token = 1 vote.</p>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs mb-1 font-bold text-zinc-400">
                <span>For (Yes)</span>
                <span>{votes.yes.toLocaleString()} ({getPercent(votes.yes)}%)</span>
              </div>
              <div className="w-full bg-zinc-900 h-2.5 rounded border border-zinc-800 overflow-hidden">
                <div className="bg-yellow-500 h-full transition-all duration-300" style={{ width: `${getPercent(votes.yes)}%` }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1 font-bold text-zinc-400">
                <span>Against (No)</span>
                <span>{votes.no.toLocaleString()} ({getPercent(votes.no)}%)</span>
              </div>
              <div className="w-full bg-zinc-900 h-2.5 rounded border border-zinc-800 overflow-hidden">
                <div className="bg-red-500/80 h-full transition-all duration-300" style={{ width: `${getPercent(votes.no)}%` }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1 font-bold text-zinc-400">
                <span>Abstain</span>
                <span>{votes.abstain.toLocaleString()} ({getPercent(votes.abstain)}%)</span>
              </div>
              <div className="w-full bg-zinc-900 h-2.5 rounded border border-zinc-800 overflow-hidden">
                <div className="bg-zinc-600 h-full transition-all duration-300" style={{ width: `${getPercent(votes.abstain)}%` }}></div>
              </div>
            </div>
          </div>

          {!myVote ? (
            <div className="flex gap-2">
              <button 
                onClick={() => castVote("yes")} 
                className="flex-1 bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-2 rounded text-xs transition-colors cursor-pointer"
              >
                VOTE YES
              </button>
              <button 
                onClick={() => castVote("no")} 
                className="flex-1 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white font-bold py-2 rounded text-xs transition-colors cursor-pointer"
              >
                VOTE NO
              </button>
            </div>
          ) : (
            <div className="bg-yellow-950/30 border border-yellow-500/20 text-center py-2.5 rounded text-xs text-yellow-400 font-bold">
              ✓ Successfully cast {myVote.toUpperCase()} vote with 500 VP
            </div>
          )}
        </div>
      );
    }
  }
];

export default function GalleryPage() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [activeTab, setActiveTab] = useState<"preview" | "prompt" | "code">("preview");
  const [copied, setCopied] = useState(false);

  const currentProject = GALLERY_PROJECTS[selectedIdx];

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(currentProject.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const PreviewComponent = currentProject.previewComponent;

  return (
    <div className="flex flex-col min-h-screen text-white bg-black font-sans relative overflow-x-hidden">
      {/* Background Tech Details */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none z-0"></div>
      
      {/* Header */}
      <header className="relative z-10 pt-8 top-0 left-0 w-full">
        <div className="flex items-center justify-between container mx-auto px-6 max-w-6xl">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="w-[100px] md:w-[120px] text-white" />
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors font-mono text-sm tracking-wider uppercase select-none cursor-pointer"
          >
            <ArrowLeft size={16} />
            Back to Build
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 relative z-10 container max-w-6xl mx-auto px-6 pt-12 pb-24">
        {/* Title */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-950/50 border border-yellow-500/30 rounded-full text-yellow-500 text-xs font-mono mb-4">
            <Sparkles size={12} />
            <span>Curated Output Gallery</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-sentient text-zinc-100 tracking-tight leading-tight mb-4">
            Example Projects
          </h1>
          <p className="text-sm md:text-base text-zinc-400 font-mono max-w-2xl leading-relaxed">
            Explore live previews, input prompt structures, and clean modular code generated dynamically using Ender.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Projects List Menu */}
          <div className="lg:col-span-4 space-y-4">
            <div className="text-zinc-500 text-xs font-mono uppercase tracking-wider font-bold mb-2 px-1">
              Select Application
            </div>
            <div className="space-y-3">
              {GALLERY_PROJECTS.map((proj, idx) => (
                <div
                  key={proj.id}
                  onClick={() => {
                    setSelectedIdx(idx);
                    setActiveTab("preview");
                  }}
                  className={`p-4 border-2 transition-all duration-200 cursor-pointer select-none group text-left ${
                    selectedIdx === idx
                      ? "bg-neutral-800 border-yellow-400 shadow-[0_0_15px_rgba(234,179,8,0.15)]"
                      : "bg-zinc-950 border-neutral-800 hover:border-zinc-700"
                  }`}
                  style={{
                    clipPath: "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)"
                  }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-sm tracking-wide text-zinc-100 group-hover:text-yellow-400 transition-colors">
                      {proj.name}
                    </h3>
                    <span className="text-[10px] px-2 py-0.5 bg-zinc-900 border border-zinc-800 rounded font-mono text-zinc-400">
                      {proj.chain}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 font-mono line-clamp-2 leading-relaxed">
                    {proj.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Output Details */}
          <div className="lg:col-span-8 space-y-6">
            <div 
              className="bg-neutral-900 border-2 border-neutral-700 p-1"
              style={{
                clipPath: "polygon(0 16px, 16px 0, calc(100% - 16px) 0, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0 calc(100% - 16px))"
              }}
            >
              <div className="p-6 md:p-8 flex flex-col gap-6">
                {/* Meta details */}
                <div className="flex flex-wrap items-center justify-between border-b border-zinc-800 pb-4 gap-4">
                  <div>
                    <h2 className="text-xl md:text-2xl font-sentient text-white font-bold">{currentProject.name}</h2>
                    <div className="flex items-center gap-4 mt-1 text-[11px] font-mono text-zinc-500">
                      <span className="flex items-center gap-1">
                        <Cpu size={12} className="text-yellow-500" />
                        Model: {currentProject.model}
                      </span>
                    </div>
                  </div>
                  
                  {/* Tabs Selector */}
                  <div className="flex bg-black border border-zinc-800 p-0.5 rounded font-mono text-xs">
                    <button
                      onClick={() => setActiveTab("preview")}
                      className={`px-3 py-1.5 transition-colors cursor-pointer rounded-sm ${
                        activeTab === "preview" ? "bg-yellow-400 text-black font-bold" : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      Live Output
                    </button>
                    <button
                      onClick={() => setActiveTab("prompt")}
                      className={`px-3 py-1.5 transition-colors cursor-pointer rounded-sm ${
                        activeTab === "prompt" ? "bg-yellow-400 text-black font-bold" : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      Prompt Used
                    </button>
                    <button
                      onClick={() => setActiveTab("code")}
                      className={`px-3 py-1.5 transition-colors cursor-pointer rounded-sm ${
                        activeTab === "code" ? "bg-yellow-400 text-black font-bold" : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      Generated Code
                    </button>
                  </div>
                </div>

                {/* Tab Contents */}
                <div className="min-h-[300px] flex flex-col">
                  {activeTab === "preview" && (
                    <div className="flex-1 flex flex-col justify-center">
                      <div className="text-[11px] text-zinc-500 font-mono uppercase font-bold tracking-wider mb-3 flex items-center gap-1.5">
                        <Play size={10} className="text-green-400" />
                        Interactive Generated Component Output
                      </div>
                      <PreviewComponent />
                    </div>
                  )}

                  {activeTab === "prompt" && (
                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-[11px] text-zinc-500 font-mono uppercase font-bold tracking-wider">
                          Ender Prompt Input
                        </span>
                        <button
                          onClick={handleCopyPrompt}
                          className="flex items-center gap-1.5 text-xs text-yellow-500 hover:text-yellow-400 transition-colors font-mono cursor-pointer font-bold"
                        >
                          {copied ? (
                            <>
                              <Check size={12} />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy size={12} />
                              Copy Prompt
                            </>
                          )}
                        </button>
                      </div>
                      <div className="bg-black border border-zinc-800 p-4 rounded-lg font-mono text-sm leading-relaxed text-zinc-300 select-all whitespace-pre-wrap flex-1">
                        {currentProject.prompt}
                      </div>
                    </div>
                  )}

                  {activeTab === "code" && (
                    <div className="flex-1 flex flex-col">
                      <div className="text-[11px] text-zinc-500 font-mono uppercase font-bold tracking-wider mb-3 flex items-center gap-1.5">
                        <Code size={10} className="text-yellow-500" />
                        Component Source File
                      </div>
                      <div className="bg-black border border-zinc-800 p-4 rounded-lg overflow-x-auto font-mono text-xs text-zinc-300 whitespace-pre flex-1 max-h-[320px] scrollbar-thin">
                        <code>{currentProject.code}</code>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
