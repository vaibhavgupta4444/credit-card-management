import { motion } from 'motion/react';
import { CreditCard, AlertCircle } from 'lucide-react';

const NotFound = () => {
    
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <div className="text-center">
        {/* Animated Credit Card */}
        <motion.div
          initial={{ rotateY: 0, y: 0 }}
          animate={{ 
            rotateY: [0, 5, -5, 0],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative w-95 h-60 mx-auto mb-8"
          style={{ perspective: 1000 }}
        >
          {/* Card Background */}
          <div className="absolute inset-0 bg-linear-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl shadow-2xl overflow-hidden">
            {/* Shimmer Effect */}
            <motion.div
              className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: '-100%' }}
              animate={{ x: '200%'}}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
                repeatDelay: 1
              }}
            />
            
            {/* Card Content */}
            <div className="relative h-full p-6 flex flex-col justify-between">
              {/* Chip and Logo */}
              <div className="flex justify-between items-start">
                <div className="w-12 h-10 bg-linear-to-br from-yellow-200 to-yellow-400 rounded-md" />
                <CreditCard className="w-10 h-10 text-white/80" />
              </div>

              {/* 404 as Card Number */}
              <div>
                <div className="text-white/90 text-3xl font-mono tracking-[0.3em] mb-4">
                  4040 4040 4040 4040
                </div>
                
                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-white/60 text-xs uppercase tracking-wide mb-1">
                      Cardholder
                    </div>
                    <div className="text-white/90 text-sm font-medium">
                      PAGE NOT FOUND
                    </div>
                  </div>
                  <div>
                    <div className="text-white/60 text-xs uppercase tracking-wide mb-1">
                      Expires
                    </div>
                    <div className="text-white/90 text-sm font-mono">
                      --/--
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Circles */}
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
            <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
          </div>
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-center gap-2 text-red-400">
            <AlertCircle className="w-6 h-6" />
            <h1 className="text-6xl font-bold">404</h1>
          </div>
          
          <h2 className="text-2xl font-semibold text-white">
            Transaction Declined
          </h2>
          
          <p className="text-slate-400 max-w-md mx-auto">
            The page you're looking for has been declined. It seems this card has insufficient permissions or the page doesn't exist.
          </p>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center mt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-shadow"
              onClick={() => window.history.back()}
            >
              Go Back
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-slate-700 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-shadow"
              onClick={() => window.location.href = '/'}
            >
              Return Home
            </motion.button>
          </div>
        </motion.div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-purple-500/30 rounded-full"
              initial={{ 
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight 
              }}
              animate={{
                y: [null, Math.random() * window.innerHeight],
                x: [null, Math.random() * window.innerWidth],
              }}
              transition={{
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear"
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
export default NotFound;